const _ = require('lodash');
const { Ad } = require('@models');
const { FinalCostService } = require('@services');

function getAd(adId, userId) {
  const escapedUserId = Ad.escape(userId);
  const escapedAdId = Ad.escape(adId);

  const gettingAdQuery = userId
    ? (`SELECT DISTINCT ads.*, locations.address, locations.country_name, 
      ad_wishes.user_id AS is_wishing FROM ads
      LEFT JOIN ad_wishes ON ad_wishes.user_id = ${escapedUserId} AND ads.id = ad_wishes.ad_id
      LEFT JOIN locations ON locations.id = ads.location_id
      WHERE ads.id = ${escapedAdId};`)
    : `SELECT ads.*, locations.address, locations.country_name FROM ads
    LEFT JOIN locations ON locations.id = ads.location_id WHERE ads.id = ${escapedAdId};`;

  return new Promise((resolve, reject) => {
    Ad.exec(gettingAdQuery)
      .then((result) => {
        if (!result.length) {
          resolve(null);
        }

        resolve(new Ad(result[0]));
      })
      .catch(reject);
  });
}

function read(req, res) {
  const { id } = req.params;
  const userId = req.user ? req.user.id : null;

  getAd(id, userId).then((ad) => {
    if (ad) {
      res.send(ad);
    } else {
      res.sendStatus(404);
    }
  }).catch(() => res.sendStatus(500));
}

function destroy(req, res) {
  const { id } = req.params;

  Ad.exec(`SELECT author_id FROM ads WHERE id = ${id}`)
    .then((result) => {
      if (!result[0]) {
        res.sendStatus(404);
        return;
      }

      if (result[0].author_id === req.user.id) {
        Ad.delete(id)
          .then(() => res.sendStatus(204))
          .catch(() => res.sendStatus(500));
      } else {
        res.sendStatus(403);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
}

function update(req, res) {
  const { id } = req.params;

  Ad.exec('SELECT author_id FROM ads WHERE id = ?', [id])
    .then((result) => {
      if (result[0] && result[0].author_id === req.user.id) {
        // TODO: implement updating
        res.sendStatus(405);
      } else {
        res.sendStatus(403);
      }
    })
    .catch(() => {
      res.sendStatus(500);
    });
}

function create(req, res) {
  const newAd = req.body;

  const permittedFields = [
    'cost', 'description', 'header', 'engine_capacity', 'power', 'engine_type',
    'year_of_production', 'brand', 'model', 'mileage', 'location_id',
  ];

  const adParams = _.pick(newAd, permittedFields);

  adParams.author_id = req.user.id;

  Ad.create(adParams)
    .then(ad => res.status(201).json(ad.id))
    .catch(() => res.sendStatus(500));
}

function getAllAds(userId, perPage = 25, page = 0, searchQuery = '', destinationCountry = '') {
  const escapedUserId = Ad.escape(userId);
  const escapedPerPage = Ad.escape(perPage);
  const escapedPage = Ad.escape(page);
  const offset = escapedPerPage * escapedPage;
  const gettingAdQuery = userId
    ? (`SELECT DISTINCT ads.*, locations.address, locations.country_name,
        ad_wishes.user_id IS NOT NULL AS is_wishing,
        GROUP_CONCAT(ad_photos.photo_id) AS photo_ids FROM ads
        LEFT JOIN ad_wishes ON ad_wishes.user_id = ${escapedUserId} AND ads.id = ad_wishes.ad_id
        LEFT JOIN locations ON locations.id = ads.location_id
        LEFT JOIN ad_photos ON ad_photos.ad_id = ads.id
        ${searchQuery}
        GROUP BY ads.id
        LIMIT ${escapedPerPage} OFFSET ${escapedPage};`)
    : `SELECT
         ads.*,
         locations.address, locations.country_name,
         GROUP_CONCAT(ad_photos.photo_id) AS photo_ids
       FROM ads
       LEFT JOIN locations ON locations.id = ads.location_id
       LEFT JOIN ad_photos ON ad_photos.ad_id = ads.id
       ${searchQuery}
       GROUP BY ads.id
       LIMIT ${escapedPerPage} OFFSET ${offset};`;

  return new Promise((resolve, reject) => {
    Ad.exec(gettingAdQuery)
      .then((result) => {
        const ads = result.map((adArgs) => {
          const ad = new Ad(adArgs);

          if (ad.photo_ids) {
            ad.photo_ids = ad.photo_ids.split(',').map(id => +id);
          }

          return ad;
        });

        new FinalCostService()
          .call(ads, destinationCountry)
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

function readAll(req, res) {
  const userId = req.user ? req.user.id : null;
  let { per_page: perPage, page } = req.query;
  perPage = perPage ? +perPage : undefined;
  page = page ? +page : undefined;
  const searchParams = req.query.q;
  const destinationCountry = req.query.country;
  const searchQuery = searchParams ? 'WHERE '.concat(Ad.toSearchQuery(searchParams)) : undefined;

  getAllAds(userId, perPage, page, searchQuery, destinationCountry)
    .then(result => res.send(result))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}

module.exports = {
  read,
  destroy,
  update,
  create,
  readAll,
};

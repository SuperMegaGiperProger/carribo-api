const mysql = require('mysql');
const dbConfig = require('@config/db');

const _ = require('lodash');
const { Ad } = require('@models');

const connection = mysql.createConnection(dbConfig);
connection.connect();

function getAd(adId, userId) {
  const escapedUserId = connection.escape(userId);
  const escapedAdId = connection.escape(adId);

  const gettingAdQuery = userId
    ? (`SELECT DISTINCT ads.*, locations.address, locations.country_name, 
      cost_dependencies.formula, wish_ads.user_id AS is_wishing FROM ads
      LEFT JOIN wish_ads ON wish_ads.user_id = ${escapedUserId} AND ads.id = wish_ads.ad_id
      LEFT JOIN locations ON locations.id = ads.location_id
      LEFT JOIN cost_dependencies ON cost_dependencies.source_country_name = locations.country_name
      AND cost_dependencies.destination_country_name = 'Belarus'
      WHERE ads.id = ${escapedAdId};`)
    : `SELECT ads.*, locations.address, locations.country_name FROM ads
    LEFT JOIN locations ON locations.id = ads.location_id WHERE ads.id = ${escapedAdId};`;

  return new Promise((resolve, reject) => {
    connection.query(gettingAdQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      if (!result.length) {
        resolve(null);
      }

      const ad = result[0];
      if (userId && ad.formula) {
        const finalCost = Math.round(eval(ad.formula.replace('{cost}', ad.cost)));
        ad.final_cost = finalCost || null;
      }

      resolve(ad);
    });
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
  connection.query(`SELECT author_id FROM ads WHERE id = ${id}`, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
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
  });
}

function update(req, res) {
  const { id } = req.params;

  connection.query('SELECT author_id FROM ads WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    if (result[0] && result[0].author_id === req.user.id) {
      // TODO: implement updating
      res.sendStatus(405);
    } else {
      res.sendStatus(403);
    }
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
  const escapedUserId = connection.escape(userId);
  const escapedPerPage = connection.escape(perPage);
  const escapedPage = connection.escape(page);
  const escapedDestCountry = connection.escape(destinationCountry);
  const offset = escapedPerPage * escapedPage;
  const gettingAdQuery = userId
    ? (`SELECT DISTINCT ads.*, locations.address, locations.country_name,
        wish_ads.user_id IS NOT NULL AS is_wishing, cost_dependencies.formula,
        GROUP_CONCAT(ad_photos.photo_id) AS photo_ids FROM ads
        LEFT JOIN wish_ads ON wish_ads.user_id = ${escapedUserId} AND ads.id = wish_ads.ad_id
        LEFT JOIN locations ON locations.id = ads.location_id
        LEFT JOIN ad_photos ON ad_photos.ad_id = ads.id
        LEFT JOIN cost_dependencies ON cost_dependencies.source_country_name = locations.country_name
          AND cost_dependencies.destination_country_name = ${escapedDestCountry}
        ${searchQuery}
        GROUP BY ads.id
        LIMIT ${escapedPerPage} OFFSET ${escapedPage};`)
    : `SELECT
         ads.*,
         locations.address, locations.country_name,
         GROUP_CONCAT(ad_photos.photo_id) AS photo_ids,
         cost_dependencies.formula
       FROM ads
       LEFT JOIN locations ON locations.id = ads.location_id
       LEFT JOIN ad_photos ON ad_photos.ad_id = ads.id
       LEFT JOIN cost_dependencies ON cost_dependencies.source_country_name = locations.country_name
         AND cost_dependencies.destination_country_name = ${escapedDestCountry}
       ${searchQuery}
       GROUP BY ads.id
       LIMIT ${escapedPerPage} OFFSET ${offset};`;

  return new Promise((resolve, reject) => {
    connection.query(gettingAdQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      const ads = result;

      ads.forEach((ad) => {
        if (ad.formula) {
          const finalCost = Math.round(eval(ad.formula.replace('{cost}', ad.cost)));
          // eslint-disable-next-line no-param-reassign
          ad.final_cost = finalCost || null;
        }

        if (ad.photo_ids) {
          // eslint-disable-next-line no-param-reassign
          ad.photo_ids = ad.photo_ids.split(',').map(id => +id);
        }
      });

      resolve(result);
    });
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

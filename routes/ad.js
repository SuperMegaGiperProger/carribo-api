const mysql = require('mysql');
const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig);
connection.connect();

const destinationCountry = 'Belarus';

function calculateFinalCost(ad) {
  return new Promise((resolve, reject) => {
    const countryName = `SELECT country_name FROM locations WHERE id = ${ad.location_id}`;
    connection.query(`SELECT formula FROM cost_dependencies WHERE destination_country_name = '${destinationCountry}'
      and source_country_name = (${countryName})`, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const payload = result[0] ? result[0].formula : '';
      resolve(payload);
    });
  });
}

function getAdPhotos(ad) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT photo_id FROM ad_photos WHERE ad_id = '${ad.id}'`, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.map(photo => photo.photo_id));
    });
  });
}

function getAd(adId, userId) {
  const escapedUserId = connection.escape(userId);
  const escapedAdId = connection.escape(adId);

  const gettingAdQuery = userId
    ? (`SELECT DISTINCT ads.*, locations.address, locations.country_name, wish_ads.user_id AS is_wishing FROM ads
       LEFT JOIN wish_ads ON wish_ads.user_id = ${escapedUserId} AND ads.id = wish_ads.ad_id
       LEFT JOIN locations ON locations.id = ads.location_id
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

      calculateFinalCost(result[0]).then((finalCost) => {
        // eslint-disable-next-line no-param-reassign
        result[0].final_cost = finalCost ? Math.round(eval(finalCost.replace('{cost}', result[0].cost))) : null;
        resolve(result[0]);
      }).catch(() => reject());
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
    if (result[0].author_id === req.user.id) {
      connection.query(`DELETE FROM ads WHERE ads.id = ${id}`, (error) => {
        if (error) {
          res.sendStatus(500);
          return;
        }
        res.sendStatus(204);
      });
    } else {
      res.sendStatus(403);
    }
  });
}

function update(req, res) {
  const { id } = req.params;
  connection.query(`SELECT author_id FROM ads WHERE id = ${id}`, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    if (result[0] && result[0].author_id === req.user.id) {
      res.send({
        id: 3,
        cost: 47000,
        description: 'Audi A3 for sale',
      });
    } else {
      res.sendStatus(403);
    }
  });
}

function createAd(newAd) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ads (cost, description, header, engine_capacity,
      power, engine_type, year_of_production, brand, model, mileage, location_id) VALUES (${newAd.cost}, '${newAd.description}',
      '${newAd.header}', ${newAd.engine_capacity}, ${newAd.power}, '${newAd.engine_type}', ${newAd.year_of_production},
      '${newAd.brand}', '${newAd.model}', ${newAd.mileage}, 10)`, (err, result) => {
      if (err) {
        reject();
        return;
      }
      resolve({ id: result.insertId });
    });
  });
}

function create(req, res) {
  const newAd = req.body;
  createAd(newAd).then(ad => res.status(201).json(ad.id))
    .catch(() => res.sendStatus(500));
}

function getAllAds(userId) {
  const escapedUserId = connection.escape(userId);
  const gettingAdQuery = userId
    ? (`SELECT DISTINCT ads.*, locations.address, locations.country_name, wish_ads.user_id AS is_wishing FROM ads
        LEFT JOIN wish_ads ON wish_ads.user_id = ${escapedUserId} AND ads.id = wish_ads.ad_id
        LEFT JOIN locations ON locations.id = ads.location_id;`)
    : 'SELECT ads.*, locations.address, locations.country_name FROM ads LEFT JOIN locations ON locations.id = ads.location_id;';

  return new Promise((resolve, reject) => {
    connection.query(gettingAdQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      const ads = result;
      const promises = [];

      ads.forEach((ad) => {
        promises.push(calculateFinalCost(ad).then((finalCost) => {
          // eslint-disable-next-line no-param-reassign
          ad.final_cost = finalCost ? Math.round(eval(finalCost.replace('{cost}', ad.cost))) : null;
        }).catch(() => reject()));
        promises.push(getAdPhotos(ad).then((photoIds) => {
          // eslint-disable-next-line no-param-reassign
          ad.photo_ids = photoIds;
        }).catch(() => reject()));
      });

      Promise.all(promises).then(() => resolve(result));
    });
  });
}

function readAll(req, res) {
  const userId = req.user ? req.user.id : null;

  getAllAds(userId).then(result => res.send(result)).catch(() => res.sendStatus(500));
}

module.exports = {
  getAllAds,
  getAd,
  createAd,
  read,
  destroy,
  update,
  create,
  readAll,
};

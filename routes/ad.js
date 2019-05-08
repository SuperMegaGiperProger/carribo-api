const mysql = require('mysql');
const dbConfig = require('../config/db');
const searchOperations = require('../constants/searchOperations');

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

function toSearchQuery(searchParamsObject) {
  const params = Object.keys(searchParamsObject);
  let query = '';

  const getConditionQuery = (param, condition) => {
    const operation = searchOperations[condition[0]];
    let value;
    switch (operation) {
      case 'IN': {
        value = '(';
        const { length } = condition[1];
        condition[1].forEach((element, i) => {
          value = i + 1 === length ? value.concat(`'${element}')`) : value.concat(`'${element}', `);
        });
        break;
      }

      case 'LIKE':
        value = `'%${condition[1]}%'`;
        break;

      default:
        value = +condition[1] ? +condition[1] : `'${condition[1]}'`;
        break;
    }

    return `${param} ${operation} ${value}`;
  };

  const paramsNumber = params.length;

  params.forEach((param, index) => {
    const operations = searchParamsObject[param];
    const conditions = Object.entries(operations);
    const conditionsNumber = conditions.length;

    conditions.forEach((condition, i) => {
      const queryOperation = index + 1 === paramsNumber && i + 1 === conditionsNumber ? '' : 'AND ';
      const conditionQuery = getConditionQuery(param, condition);
      query = query.concat(`${conditionQuery} ${queryOperation}`);
    });
  });
  return query;
}

function getAllAds(userId, perPage = 25, page = 0, searchQuery = '') {
  const escapedUserId = connection.escape(userId);
  const escapedPerPage = connection.escape(perPage);
  const escapedPage = connection.escape(page);
  const offset = escapedPerPage * escapedPage;
  const gettingAdQuery = userId
    ? (`SELECT DISTINCT ads.*, locations.address, locations.country_name, wish_ads.user_id AS is_wishing,
        GROUP_CONCAT(ad_photos.photo_id) AS photo_ids FROM ads
        LEFT JOIN wish_ads ON wish_ads.user_id = ${escapedUserId} AND ads.id = wish_ads.ad_id
        LEFT JOIN locations ON locations.id = ads.location_id
        LEFT JOIN ad_photos ON ad_photos.ad_id = ads.id
        ${searchQuery}
        GROUP BY ads.id
        LIMIT ${escapedPerPage} OFFSET ${escapedPage};`)
    : `SELECT ads.*, locations.address, locations.country_name, GROUP_CONCAT(ad_photos.photo_id) AS photo_ids FROM ads LEFT JOIN locations
      ON locations.id = ads.location_id
      LEFT JOIN ad_photos ON ad_photos.ad_id = ads.id
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
      const promises = [];

      ads.forEach((ad) => {
        promises.push(calculateFinalCost(ad).then((finalCost) => {
          // eslint-disable-next-line no-param-reassign
          ad.final_cost = finalCost ? Math.round(eval(finalCost.replace('{cost}', ad.cost))) : null;
        }).catch(() => reject()));

        if (ad.photo_ids) {
          // eslint-disable-next-line no-param-reassign
          ad.photo_ids = ad.photo_ids.split(',').map(id => +id);
        }
      });

      Promise.all(promises).then(() => resolve(result));
    });
  });
}

function readAll(req, res) {
  const userId = req.user ? req.user.id : null;
  let { per_page: perPage, page } = req.query;
  perPage = perPage ? +perPage : undefined;
  page = page ? +page : undefined;
  const searchParams = req.query.q;
  const searchQuery = searchParams ? 'WHERE '.concat(toSearchQuery(searchParams)) : undefined;

  getAllAds(userId, perPage, page, searchQuery).then(result => res.send(result))
    .catch(() => res.sendStatus(500));
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

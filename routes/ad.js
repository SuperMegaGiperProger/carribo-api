const mysql = require('mysql');
const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig); 
connection.connect();

const destinationCountry = 'Belarus';

function calculateFinalCost(ad) {
  return new Promise ((resolve, reject) => {
      const countryName = `SELECT country_name FROM locations WHERE id = ${ad.location_id}`;
      connection.query(`SELECT formula FROM cost_dependencies WHERE destination_country_name = '${destinationCountry}'
      and source_country_name = (${countryName})`, (err, result) => {
          if (err) {
              reject(err);
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
            }
            resolve(result.map((photo) => photo.photo_id));
        });
    });
}

module.exports.read = (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM ads WHERE ads.id = ${id}`, (err, result) => {
      if (err) {
          res.sendStatus(500);
          return;
      }
      if (!result.length) {
          res.sendStatus(404);
          return;
      }
      calculateFinalCost(result[0]).then((finalCost) => {
          result[0].final_cost = finalCost ? Math.round(eval(finalCost.replace('{cost}', result[0].cost))) : result[0].cost;            
          res.send(result[0]);
      }).catch(() => res.sendStatus(500));
  });
}

module.exports.delete = (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT author_id FROM ads WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        if (result[0].author_id === req.user.id) {
            connection.query(`DELETE FROM ads WHERE ads.id = ${id}`, (err, result) => {
                if (err) {
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

module.exports.update = (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT author_id FROM ads WHERE id = ${id}`, (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        if (result[0] && result[0].author_id === req.user.id) {
            res.send({
                "id": 3,
                "cost": 47000,
                "description": "Audi A3 for sale",
            });
        } else {
            res.sendStatus(403);
        }
    });
}

module.exports.create = (req, res) => {
    const newAd = req.body;
    connection.query(`INSERT INTO ads (cost, description, header, engine_capacity,
        power, engine_type, year_of_production, brand, model, mileage, location_id) VALUES (${newAd.cost}, '${newAd.description}',
        '${newAd.header}', ${newAd.engine_capacity}, ${newAd.power}, '${newAd.engine_type}', ${newAd.year_of_production},
        '${newAd.brand}', '${newAd.model}', ${newAd.mileage}, 10)`, (err, result) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            const createdAd = result;
            res.status(201).json(createdAd);
    });
}

module.exports.readAll = (req, res) => {
    connection.query('SELECT * FROM ads', (err, result) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        const promises = [];
        result.forEach((ad) => {            
            promises.push(calculateFinalCost(ad).then((finalCost) => {       
                ad.final_cost = finalCost ? Math.round(eval(finalCost.replace('{cost}', ad.cost))) : null;
            }).catch(() => res.sendStatus(500)));
            promises.push(getAdPhotos(ad).then((photoIds) => {
                ad.photo_ids = photoIds;
            }).catch(() => res.sendStatus(500)));
        });

        Promise.all(promises).then(() => {
            res.send(result);
        }).catch(() => res.sendStatus(500));
    });
}
const mysql = require('mysql');
const dbConfig = require('@config/db');

const connection = mysql.createConnection(dbConfig);
connection.connect();

function getCountriesList() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM countries', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports.readAll = (_, res) => {
  getCountriesList()
    .then(countries => res.status(200).json(countries))
    .catch(() => res.sendStatus(500));
};

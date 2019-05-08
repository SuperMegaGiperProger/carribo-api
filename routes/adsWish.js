const mysql = require('mysql');
const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig);
connection.connect();

function createAdWish(adId, userId) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO wish_ads (ad_id, user_id) VALUES (?, ?)', [adId, userId], (err) => {
      if (err) {
        reject();
        return;
      }
      resolve();
    });
  });
}

function create(req, res) {
  const adId = req.params.ad_id;
  const userId = req.user.id;

  createAdWish(adId, userId).then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
}

function deleteAdWish(adId, userId) {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM wish_ads WHERE ad_id = ? AND user_id = ?', [adId, userId], (err) => {
      if (err) {
        reject();
        return;
      }
      resolve();
    });
  });
}

function destroy(req, res) {
  const adId = req.params.ad_id;
  const userId = req.user.id;
  deleteAdWish(adId, userId).then(() => res.sendStatus(204)).catch(() => res.sendStatus(500));
}

module.exports = {
  create,
  destroy,
};

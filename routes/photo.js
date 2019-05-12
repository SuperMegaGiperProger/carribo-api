const mysql = require('mysql');
const path = require('path');
const dbConfig = require('@config/db');

const connection = mysql.createConnection(dbConfig);
connection.connect();

const UPLOADS_PATH = 'public/uploads';

module.exports.read = (req, res) => {
  const adId = req.params.ad_id;
  const photoId = req.params.photo_id;
  connection.query(`SELECT photo_id FROM ad_photos WHERE ad_id = ${adId} and photo_id = ${photoId}`, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    if (result.length) {
      connection.query(`SELECT path FROM photos WHERE id = ${photoId}`, (err, result) => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        const photoPath = result[0].path;
        res.sendFile(path.join(path.dirname(require.main.filename), UPLOADS_PATH, photoPath));
      });
    } else {
      res.sendStatus(404);
    }
  });
};

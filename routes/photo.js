const mysql = require('mysql');
const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig); 
connection.connect();

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
                res.sendFile(require('path').dirname(require.main.filename) + photoPath);
            });
        } else {
            res.sendStatus(404);
        }
    });
}
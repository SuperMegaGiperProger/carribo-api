const jwt = require('jsonwebtoken');
const jwtConfig = require('./config/jwt.js');
const mysql = require('mysql');
const dbConfig = require('./config/db');

const connection = mysql.createConnection(dbConfig); 
connection.connect();

const checkToken = (req, res, next) => {
    const header = req.headers['x-access-token'] || req.headers['authorization'];
 
    if (header) {
      const token = header;

      jwt.verify(token, jwtConfig.secret, (err, user) => {
        if (err) {
            res.sendStatus(403);
        } else {
          connection.query(`SELECT id FROM users WHERE username='${user.username}' AND password='${user.password}'`, (err, result) => {
            if (err) {
              res.sendStatus(403);
            }
            if (result[0]) {
              req.user = result[0];            
              next();
            }
          });
        }
    });
    } else {
      res.sendStatus(403);
    }
  };
  
module.exports = {
    checkToken: checkToken
}
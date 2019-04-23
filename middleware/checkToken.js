const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const jwtConfig = require('../config/jwt.js');
const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig);
connection.connect();

const checkToken = (req, res, next) => {
  if (req.cookies) {
    const { token } = req.cookies;

    jwt.verify(token, jwtConfig.secret, (err, user) => {
      if (err) {
        res.sendStatus(403);
      } else {
        connection.query(`SELECT id FROM users WHERE username='${user.username}' AND password='${user.password}'`, (error, result) => {
          if (error) {
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

module.exports = checkToken;

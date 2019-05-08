const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const jwtConfig = require('../config/jwt.js');
const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig);
connection.connect();

const authenticationGen = toValidate => (req, res, next) => {
  const errorHandler = () => {
    if (toValidate) {
      res.sendStatus(403);
    }
  };

  if (req.cookies && req.cookies.token) {
    const { token } = req.cookies;

    jwt.verify(token, jwtConfig.secret, (err, user) => {
      if (err) {
        errorHandler();
      } else {
        connection.query(`SELECT id FROM users WHERE username='${user.username}' AND password='${user.password}'`, (error, result) => {
          if (error) {
            errorHandler();
          }
          if (result[0]) {
            req.user = result[0];
            next();
          }
        });
      }
    });
  } else {
    errorHandler();
    next();
  }
};

module.exports = authenticationGen;

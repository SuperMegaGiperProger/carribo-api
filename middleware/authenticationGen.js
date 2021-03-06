const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const jwtConfig = require('@config/jwt.js');
const dbConfig = require('@config/db');

const connection = mysql.createConnection(dbConfig);
connection.connect();

const authenticationGen = toValidate => (req, res, next) => {
  const errorHandler = () => {
    if (toValidate) {
      res.sendStatus(403);
    } else {
      next();
    }
  };

  if (req.headers.authorization) {
    const token = req.headers.authorization;

    jwt.verify(token, jwtConfig.secret, (err, user) => {
      if (err) {
        errorHandler();
      } else {
        connection.query(`SELECT id FROM users WHERE username='${user.username}' AND password='${user.password}'`, (error, result) => {
          if (result[0]) {
            req.user = result[0];
            console.log(`Authorized request: ${JSON.stringify(req.user)}`);
            next();
          } else {
            errorHandler();
          }
        });
      }
    });
  } else {
    errorHandler();
  }
};

module.exports = authenticationGen;

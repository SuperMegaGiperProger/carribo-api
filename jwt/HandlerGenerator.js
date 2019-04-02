const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');
const mysql = require('mysql');
const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig); 
connection.connect();

class HandlerGenerator {
    login (req, res) {
      const {username, password} = req.body;

      connection.query(`SELECT * FROM users WHERE username='${username}'`, (err, result) => {
          const user = result[0];

          if (user && username === user.username && password === user.password) {
            const token = jwt.sign({username, password},
              jwtConfig.secret,
              {expiresIn: '180d'},
            );
            res.json({token});
          } else {
            res.status(403).send('Invalid username or password');
          }
      });
    }
}

module.exports = HandlerGenerator;
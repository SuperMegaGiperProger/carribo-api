const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const jwtConfig = require('../config/jwt');
const dbConfig = require('../config/db');

const connection = mysql.createConnection(dbConfig);
connection.connect();

module.exports.create = (req, res) => {
  const { username, password } = req.body;

  connection.query(`SELECT * FROM users WHERE username='${username}'`, (err, result) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const user = result[0];

    if (user && username === user.username && password === user.password) {
      const token = jwt.sign({ username, password },
        jwtConfig.secret,
        { expiresIn: '180d' });
      res.json({ ...user, token });
    } else {
      res.status(403).send('Invalid username or password');
    }
  });
};

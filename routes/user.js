const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dbConfig = require('@config/db');

const saltRounds = 10;

const connection = mysql.createConnection(dbConfig);
connection.connect();

function createLocation(country) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO locations (country_name) VALUES (?)', [country], (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result.insertId);
    });
  });
}

function createProfile(locationId) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO profiles (location_id) VALUES (${locationId})`, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result.insertId);
    });
  });
}

function checkUsername(username) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      if (res[0]) {
        reject();
      } else {
        resolve();
      }
    });
  });
}

function createUserRecord(username, password, profileId) {
  return new Promise((resolve, reject) => {
    const hash = bcrypt.hashSync(password, saltRounds);

    connection.query(
      "INSERT INTO users (username, password, role, profile_id) VALUES (?, ?, 'user', ?);",
      [username, hash, profileId],
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({ id: result.insertId });
      },
    );
  });
}

function createUser(username, password, country) {
  return new Promise((resolve, reject) => {
    checkUsername(username)
      .then(() => createLocation(country))
      .then(createProfile)
      .then(profileId => createUserRecord(username, password, profileId))
      .then(resolve)
      .catch(reject);
  });
}

module.exports.create = (req, res) => {
  const { username, password, country } = req.body;
  createUser(username, password, country)
    .then((user) => {
      res.status(201).json(user.id);
    })
    .catch((err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.sendStatus(422);
      }
    });
};

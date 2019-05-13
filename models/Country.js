const BaseModel = require('@models/BaseModel');

class Country extends BaseModel {
  static all() {
    return new Promise((resolve, reject) => {
      this.exec('SELECT * FROM countries', (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = Country;

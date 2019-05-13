const BaseModel = require('@models/BaseModel');

class AdWish extends BaseModel {
  static create(adId, userId) {
    return new Promise((resolve, reject) => {
      this.exec('INSERT INTO ad_wishes (ad_id, user_id) VALUES (?, ?)', [adId, userId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static delete(adId, userId) {
    return new Promise((resolve, reject) => {
      this.exec('DELETE FROM ad_wishes WHERE ad_id = ? AND user_id = ?', [adId, userId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = AdWish;

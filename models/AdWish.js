const BaseModel = require('@models/BaseModel');

class AdWish extends BaseModel {
  static create(adId, userId) {
    return this.exec('INSERT INTO ad_wishes (ad_id, user_id) VALUES (?, ?)', [adId, userId]);
  }

  static delete(adId, userId) {
    return this.exec('DELETE FROM ad_wishes WHERE ad_id = ? AND user_id = ?', [adId, userId]);
  }
}

module.exports = AdWish;

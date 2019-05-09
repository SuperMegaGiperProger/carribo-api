const userSession = require('./userSession');
const ad = require('./ad');
const photo = require('./photo');
const adsWish = require('./adsWish');
const user = require('./user');

const authenticationGen = require('../middleware/authenticationGen');

module.exports = (app) => {
  app.post('/v1/user_session', userSession.create);
  app.post('/v1/users', user.create);
  app.get('/v1/ads/:id', authenticationGen(false), ad.read);
  app.delete('/v1/ads/:id', authenticationGen(true), ad.destroy);
  app.put('/v1/ads/:id', authenticationGen(true), ad.update);
  app.post('/v1/ads', ad.create);
  app.get('/v1/ads', authenticationGen(false), ad.readAll);
  app.get('/v1/ads/:ad_id/photos/:photo_id', photo.read);
  app.post('/v1/ads_wish/:ad_id', authenticationGen(true), adsWish.create);
  app.delete('/v1/ads_wish/:ad_id', authenticationGen(true), adsWish.destroy);
};

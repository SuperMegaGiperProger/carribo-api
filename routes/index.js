const authenticationGen = require('@middleware/authenticationGen');
const userSession = require('./userSession');
const ad = require('./ad');
const photo = require('./photo');
const adWishes = require('./adWishes');
const user = require('./user');
const country = require('./country');


module.exports = (app) => {
  app.post('/v1/user_session', userSession.create);
  app.post('/v1/users', user.create);
  app.get('/v1/countries', country.readAll);
  app.get('/v1/ads/:id', authenticationGen(false), ad.read);
  app.delete('/v1/ads/:id', authenticationGen(true), ad.destroy);
  app.put('/v1/ads/:id', authenticationGen(true), ad.update);
  app.post('/v1/ads', authenticationGen(true), ad.create);
  app.get('/v1/ads', authenticationGen(false), ad.readAll);
  app.get('/v1/ads/:ad_id/photos/:photo_id', photo.read);
  app.post('/v1/ad_wishes/:ad_id', authenticationGen(true), adWishes.create);
  app.delete('/v1/ad_wishes/:ad_id', authenticationGen(true), adWishes.destroy);
};

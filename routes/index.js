const userSession = require('./userSession');
const ad = require('./ad');
const photo = require('./photo');

const checkToken = require('../middleware/checkToken');

module.exports = (app) => {
  app.post('/v1/user_session', userSession.create);
  app.get('/v1/ads/:id', ad.read);
  app.delete('/v1/ads/:id', checkToken, ad.destroy);
  app.put('/v1/ads/:id', checkToken, ad.update);
  app.post('/v1/ads', ad.create);
  app.get('/v1/ads', ad.readAll);
  app.get('/v1/ads/:ad_id/photos/:photo_id', photo.read);
};

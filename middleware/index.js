module.exports = function (app, express) {
  const bodyParser = require('body-parser');
  const router = require('../routes');

  app.use(bodyParser.urlencoded({
      extended: true,
  }));

  app.use(bodyParser.json());
  
  router(app);
}
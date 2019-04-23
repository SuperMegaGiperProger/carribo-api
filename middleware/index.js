const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('../routes');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());

  app.use(cookieParser());

  router(app);
};

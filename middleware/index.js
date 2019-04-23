const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const router = require('../routes');

module.exports = (app) => {
  app.use(morgan('combined'));

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());

  app.use(cookieParser());

  router(app);
};

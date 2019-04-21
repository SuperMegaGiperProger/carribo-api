const bodyParser = require('body-parser');
const router = require('../routes');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());

  router(app);
};

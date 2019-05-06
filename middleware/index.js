const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const router = require('../routes');

const { queryType } = require('./query.js');

const { errorTypes } = require('./errors');

const schema = new GraphQLSchema({ query: queryType });

module.exports = (app) => {
  app.use('/v2/graphql', graphqlHTTP({
    schema,
    customFormatErrorFn: (err) => {
      const error = errorTypes[err.message];
      if (error) {
        return ({ message: error.message, statusCode: error.statusCode });
      }
      return ({ message: err.message, statusCode: 500 });
    },
    graphiql: true,
  }));

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json());

  app.use(cookieParser());

  router(app);
};

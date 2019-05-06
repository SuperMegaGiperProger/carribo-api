const {
  GraphQLObjectType,
  GraphQLList,
} = require('graphql');

const { errorNames } = require('./errors');
const { getAllAds } = require('../routes/ad');
const { adType } = require('./types.js');

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ads: {
      type: new GraphQLList(adType),
      resolve() {
        return new Promise((resolve) => {
          getAllAds().then(resolve).catch(() => {
            throw new Error(errorNames.INTERNAL_SERVER_ERROR);
          });
        });
      },
    },
  },
});

exports.queryType = queryType;

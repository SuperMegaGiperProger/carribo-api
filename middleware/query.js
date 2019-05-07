const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} = require('graphql');

const { errorNames } = require('./errors');
const { getAllAds, getAd, createAd } = require('../routes/ad');
const { adType } = require('./types.js');

const adsType = new GraphQLObjectType({
  name: 'Ads',
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
    ad: {
      type: adType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(_, args) {
        const { id } = args;
        return new Promise((resolve) => {
          getAd(id).then(resolve).catch(() => {
            throw new Error(errorNames.INTERNAL_SERVER_ERROR);
          });
        });
      },
    },
  },
});

const adMutations = new GraphQLObjectType({
  name: 'AdMutations',
  fields: {
    createAd: {
      type: adType,
      args: {
        cost: { type: GraphQLInt },
        description: { type: GraphQLString },
        header: { type: GraphQLString },
        engine_capacity: { type: GraphQLFloat },
        power: { type: GraphQLInt },
        engine_type: { type: GraphQLString },
        year_of_production: { type: GraphQLInt },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        mileage: { type: GraphQLInt },
      },
      resolve(_, args) {
        return new Promise((resolve, reject) => {
          createAd(args).then(resolve)
            .catch(() => { throw new Error(errorNames.INTERNAL_SERVER_ERROR); });
        });
      },
    },
  },
});
module.exports = {
  adsType,
  adMutations,
};

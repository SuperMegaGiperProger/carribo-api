const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require('graphql');

const adType = new GraphQLObjectType({
  name: 'Ad',
  fields: {
    id: { type: GraphQLID },
    cost: { type: GraphQLInt },
    description: { type: GraphQLString },
    header: { type: GraphQLString },
    location_id: { type: GraphQLID },
    engine_capacity: { type: GraphQLFloat },
    power: { type: GraphQLInt },
    engine_type: { type: GraphQLString },
    year_of_production: { type: GraphQLInt },
    brand: { type: GraphQLString },
    model: { type: GraphQLString },
    mileage: { type: GraphQLInt },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    author_id: { type: GraphQLID },
    final_cost: { type: GraphQLInt },
    photo_ids: { type: new GraphQLList(GraphQLID) },
  },
});

exports.adType = adType;

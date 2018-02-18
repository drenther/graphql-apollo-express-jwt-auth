const { importSchema } = require('../../utils');
const TripsResolvers = require('./resolvers');

const TripsSchema = importSchema([__dirname, 'Trips.graphql']);

module.exports = { TripsSchema, TripsResolvers };

const { importSchema } = require('../../utils');
const UsersResolvers = require('./resolvers');

const UsersSchema = importSchema([__dirname, 'Users.graphql']);

module.exports = { UsersSchema, UsersResolvers };

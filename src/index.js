const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
require('dotenv').config({
	path: path.join(__dirname, 'VARS.env'),
});

const resolvers = require('./schema/resolvers');

const typeDefs = importSchema(
	path.join(__dirname, 'schema', 'TypeDefs.graphql')
);

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Go to http://localhost:${PORT}/graphiql to run queries`);
});

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');

const { PORT } = require('./config');

const { generateAccessToken } = require('./auth/token');
require('./auth/google');

const resolvers = require('./schema/resolvers');
const typeDefs = importSchema(
	path.join(__dirname, 'schema', 'TypeDefs.graphql')
);

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const app = express();

app.use(passport.initialize());

const generateUserToken = (req, res) => {
	const accessToken = generateAccessToken(req.user.id);
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(JSON.stringify({ token: accessToken }));
};

app.get(
	'/auth/google',
	passport.authenticate('google', {
		session: false,
		scope: ['openid', 'profile', 'email'],
	})
);
app.get(
	'/auth/googleRedirect',
	passport.authenticate('google', {
		session: false,
	}),
	generateUserToken
);

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, () => {
	console.log(`Go to http://localhost:${PORT}/graphiql to run queries`);
});

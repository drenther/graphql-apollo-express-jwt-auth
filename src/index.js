const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash/merge');

const { PORT, CALLBACK_URL, MOCK_AUTH_TOKEN } = require('./config');

const { generateAccessToken } = require('./auth/token');
require('./auth/google');
const { authenticate } = require('./auth/authenticate');

const { importSchema, mergeSchemas } = require('./utils');

const { UsersSchema, UsersResolvers } = require('./schema/users');
const { TripsSchema, TripsResolvers } = require('./schema/trips');

const mongoConnection = require('./mongo');

const startServer = async () => {
	const typeDefs = mergeSchemas([UsersSchema, TripsSchema]);

	const resolvers = merge(UsersResolvers, TripsResolvers);

	const schema = makeExecutableSchema({ typeDefs, resolvers });

	const mongo = await mongoConnection();

	const app = express();

	app.use(passport.initialize());

	const generateUserToken = (req, res) => {
		const accessToken = generateAccessToken(req.user);
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		// res.send(JSON.stringify({ token: accessToken }));
		res.redirect(`${CALLBACK_URL}/#TOKEN=${accessToken}`);
	};

	app.get(
		'/auth/google',
		passport.authenticate('google', {
			session: false,
			scope: ['openid', 'profile', 'email'],
		})
	);
	app.get(
		'/auth/callback',
		passport.authenticate('google', {
			session: false,
		}),
		generateUserToken
	);

	const buildOptions = async req => {
		const user = await authenticate(req, mongo.Users);
		console.log(user);
		return {
			context: {
				mongo,
				user,
			},
			schema,
		};
	};

	app.use('/graphql', bodyParser.json(), graphqlExpress(buildOptions));

	app.use(
		'/graphiql',
		graphiqlExpress({
			endpointURL: '/graphql',
			passHeader: `Authorization: "${MOCK_AUTH_TOKEN}"`,
		})
	);

	app.listen(PORT, () => {
		console.log(`Go to http://localhost:${PORT}/graphiql to run queries`);
	});
};

startServer();

const { MongoClient } = require('mongodb');
const { MONGO_URL } = require('../config');

let db;

module.exports = async () => {
	if (!db) {
		const client = await MongoClient.connect(MONGO_URL);
		db = client.db('toor');
		console.log('Creating DB');
	}

	return {
		Users: db.collection('users'),
		Trips: db.collection('trips'),
	};
};

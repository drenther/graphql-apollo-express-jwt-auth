const books = require('../mock/mockData');

const resolvers = {
	Query: {
		books: () => books,
	},
};

module.exports = resolvers;

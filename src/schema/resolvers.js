const books = require('../mock/mockData');

const BooksResolvers = {
	Query: {
		books: async (root, data, context) => {
			return books;
		},
	},
};

module.exports = BooksResolvers;

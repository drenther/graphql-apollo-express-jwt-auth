const resolvers = {
	Query: {
		getUser: async (_, { name }, { mongo: { Users } }) =>
			await Users.findOne({ name }),
	},
};

module.exports = resolvers;

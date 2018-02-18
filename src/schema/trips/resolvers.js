const resolvers = {
	Query: {
		getTrips: async (_, args, { mongo: { Trips, Users } }) =>
			await Trips.find({}).toArray(),
	},

	Trip: {
		owner: async ({ owner }, _, { mongo: { Users } }) =>
			await Users.findOne({ _id: owner }),
	},
};

module.exports = resolvers;

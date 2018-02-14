const uuidv4 = require('uuid/v4');

const users = [
	{
		id: '45db52e1-f95c-4b5f-99a2-8b8d978c99b4',
		name: 'John',
		providers: [],
	},
];

const getUserById = id => users.find(u => u.id === id);

const getUserByExternalId = (provider, id) =>
	users.find(
		u => u.providers.findIndex(p => p.provider == provider && p.id == id) >= 0
	);

const createUser = (name, provider, id) => {
	const user = {
		id: uuidv4(),
		name,
		providers: [
			{
				provider,
				id,
			},
		],
	};
	users.push(user);
	return user;
};

module.exports = {
	getUserById,
	getUserByExternalId,
	createUser,
};

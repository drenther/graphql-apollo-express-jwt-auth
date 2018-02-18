const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config');
const mongoConnection = require('../mongo');

module.exports.authenticate = async ({ headers: { authorization } }, Users) => {
	let user = null;
	try {
		const decode = jwt.decode(authorization, TOKEN_SECRET);
		const _id = decode.sub;
		const { Users } = await mongoConnection();
		user = await Users.findOne({ _id });
	} catch (err) {
		if (err instanceof jwt.TokenExpiredError) console.error('Token Expired');
		if (err instanceof jwt.JsonWebTokenError) console.error('Token Invalid');
		if (err instanceof jwt.NotBeforeError) console.error('Token Postdated');
	}
	return user;
};

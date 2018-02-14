const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');

const {
	TOKEN_ISSUER,
	TOKEN_AUDIENCE,
	TOKEN_SECRET,
	TOKEN_EXPIRY,
} = require('../config');

const generateAccessToken = userId =>
	jwt.sign({}, TOKEN_SECRET, {
		expiresIn: TOKEN_EXPIRY,
		audience: TOKEN_AUDIENCE,
		issuer: TOKEN_ISSUER,
		subject: userId.toString(),
		keyid: uuidv4(),
	});

module.exports = {
	generateAccessToken,
};

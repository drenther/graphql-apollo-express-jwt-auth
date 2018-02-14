const path = require('path');

require('dotenv').config({
	path: path.join(__dirname, 'VARS.env'),
});

module.exports = {
	PORT: process.env.PORT,
	TOKEN_SECRET: process.env.TOKEN_SECRET,
	TOKEN_ISSUER: process.env.TOKEN_ISSUER,
	TOKEN_AUDIENCE: process.env.TOKEN_AUDIENCE,
	TOKEN_EXPIRY: process.env.TOKEN_EXPIRY,
	GOOGLE_ID: process.env.GOOGLE_ID,
	GOOGLE_SECRET: process.env.GOOGLE_SECRET,
	GOOGLE_CALLBACK: process.env.GOOGLE_CALLBACK,
};

const passport = require('passport');
const passportJwt = require('passport-jwt');
const { TOKEN_SECRET, TOKEN_ISSUER, TOKEN_AUDIENCE } = require('../config');
const { getUserById } = require('../mock/users');

const jwtOptions = {
	jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader(),
	secretOrKey: TOKEN_SECRET,
	issuer: TOKEN_ISSUER,
	audience: TOKEN_AUDIENCE,
};

passport.use(
	new passportJwt.Strategy(jwtOptions, (payload, done) => {
		console.log(payload.sub);
		const user = getUserById(parseInt(payload.sub));
		if (user) return done(null, user, payload);
		return done();
	})
);

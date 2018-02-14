const passport = require('passport');
const passportGoogle = require('passport-google-oauth');

const { getUserByExternalId, createUser } = require('../mock/users');
const { GOOGLE_ID, GOOGLE_SECRET, GOOGLE_CALLBACK } = require('../config');

const config = {
	clientID: GOOGLE_ID,
	clientSecret: GOOGLE_SECRET,
	callbackURL: GOOGLE_CALLBACK,
};

passport.use(
	new passportGoogle.OAuth2Strategy(
		config,
		(request, accessToken, refreshToken, profile, done) => {
			let user = getUserByExternalId('google', profile.id);
			if (!user) user = createUser(profile.displayName, 'google', profile.id);
			console.log(user.name);
			return done(null, user);
		}
	)
);

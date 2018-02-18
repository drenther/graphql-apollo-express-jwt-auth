const passport = require('passport');
const passportGoogle = require('passport-google-oauth');
const uuidv4 = require('uuid/v4');

const mongoConnection = require('../mongo');
const { GOOGLE_ID, GOOGLE_SECRET, GOOGLE_CALLBACK } = require('../config');

const config = {
	clientID: GOOGLE_ID,
	clientSecret: GOOGLE_SECRET,
	callbackURL: GOOGLE_CALLBACK,
};

passport.use(
	new passportGoogle.OAuth2Strategy(
		config,
		async (request, accessToken, refreshToken, { _json }, done) => {
			const email = _json.emails[0].value;
			const firstName = _json.name.givenName;
			const lastName = _json.name.familyName;
			const gender = _json.gender;
			const googleUrl = _json.url;
			const googleId = _json.id;
			const timeStamp = new Date();

			const { Users } = await mongoConnection();

			let user = await Users.findOneAndUpdate(
				{ email },
				{
					$set: {
						lastLogin: timeStamp,
						googleUrl,
					},
				},
				{
					returnOriginal: false,
				}
			);

			let _id;
			if (user.value) _id = user.value._id;
			else {
				_id = uuidv4();
				user = await Users.insertOne({
					_id,
					email,
					firstName,
					lastName,
					gender,
					googleId,
					googleUrl,
					createdAt: timeStamp,
					lastLogin: timeStamp,
				});
			}

			return done(null, _id);
		}
	)
);

const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function (app, passport) {
	let userProfile;

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
				clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
				callbackURL: `${process.env.SERVER_URL}:${process.env.PORT}/oauth/google/callback`,
			},
			function (_, __, profile, done) {
				userProfile = profile;
				return done(null, profile);
			}
		)
	);

	app.get(
		"/oauth/google",
		passport.authenticate("google", { scope: ["profile", "email"] })
	);

	app.get(
		"/oauth/google/callback",
		passport.authenticate("google", { failureRedirect: "/error" }),
		function (req, res) {
			const token = jwt.sign(userProfile._json, process.env.JWT_SECRET, {});
			res.redirect(`${process.env.CLIENT_REDIRECT_URL}/#access_token=${token}`);
		}
	);
};

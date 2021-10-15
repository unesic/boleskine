const jwt = require("jsonwebtoken");
const FacebookStrategy = require("passport-facebook");

module.exports = function (app, passport) {
	let userProfile;

	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
				callbackURL: `${process.env.SERVER_URL}/oauth/facebook/callback`,
				profileFields: ["id", "email", "name", "picture.type(large)"],
			},
			function (_, __, profile, done) {
				userProfile = profile;
				return done(null, profile);
			}
		)
	);

	app.get(
		"/oauth/facebook",
		passport.authenticate("facebook", { scope: ["public_profile", "email"] })
	);

	app.get(
		"/oauth/facebook/callback",
		passport.authenticate("facebook", { failureRedirect: "/error" }),
		function (req, res) {
			const token = jwt.sign(userProfile._json, process.env.JWT_SECRET, {});
			res.redirect(
				`${process.env.CLIENT_REDIRECT_URL}/?provider=facebook&access_token=${token}`
			);
		}
	);
};

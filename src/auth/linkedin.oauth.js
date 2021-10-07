const jwt = require("jsonwebtoken");
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

module.exports = function (app, passport) {
	let userProfile;

	passport.use(
		new LinkedInStrategy(
			{
				clientID: process.env.LINKEDIN_OAUTH_CLIENT_ID,
				clientSecret: process.env.LINKEDIN_OAUTH_CLIENT_SECRET,
				callbackURL: `${process.env.SERVER_URL}:${process.env.PORT}/oauth/linkedin/callback`,
				scope: ["r_emailaddress", "r_liteprofile"],
				state: true,
			},
			function (_, __, profile, done) {
				userProfile = profile;
				return done(null, profile);
			}
		)
	);

	app.get("/oauth/linkedin", passport.authenticate("linkedin"));

	app.get(
		"/oauth/linkedin/callback",
		passport.authenticate("linkedin", { failureRedirect: "/error" }),
		function (req, res) {
			const { displayName, emails, id, name, photos, provider } = userProfile;
			const data = { displayName, emails, id, name, photos, provider };
			const token = jwt.sign(data, process.env.JWT_SECRET, {});
			res.redirect(
				`${process.env.CLIENT_REDIRECT_URL}/?provider=linkedin&access_token=${token}`
			);
		}
	);
};

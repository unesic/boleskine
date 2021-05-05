const jwt = require("jsonwebtoken");
const GithubStrategy = require("passport-github2");

module.exports = function (app, passport) {
	let userProfile;

	passport.use(
		new GithubStrategy(
			{
				clientID: process.env.GITHUB_OAUTH_CLIENT_ID,
				clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
				callbackURL: `${process.env.SERVER_URL}:${process.env.PORT}/oauth/github/callback`,
				scope: ["user:email"],
			},
			function (_, __, profile, done) {
				userProfile = profile;
				return done(null, profile);
			}
		)
	);

	app.get("/oauth/github", passport.authenticate("github"));

	app.get(
		"/oauth/github/callback",
		passport.authenticate("github", { failureRedirect: "/error" }),
		function (req, res) {
			const token = jwt.sign(
				{ ...userProfile._json, email: userProfile.emails[0].value },
				process.env.JWT_SECRET,
				{}
			);
			res.redirect(
				`${process.env.CLIENT_REDIRECT_URL}/?provider=github&access_token=${token}`
			);
		}
	);
};

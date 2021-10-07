const passport = require("passport");
const GoogleOAuth = require("./google.oauth");
const GithubOAuth = require("./github.oauth");
const FacebookOAuth = require("./facebook.oauth");
const LinkedInOAuth = require("./linkedin.oauth");

module.exports = function (app) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function (user, cb) {
		cb(null, user);
	});

	passport.deserializeUser(function (obj, cb) {
		cb(null, obj);
	});

	GoogleOAuth(app, passport);
	GithubOAuth(app, passport);
	FacebookOAuth(app, passport);
	LinkedInOAuth(app, passport);
};

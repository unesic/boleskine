/**
 * System
 */
const path = require("path");

/**
 * Apollo Server & mongoose
 */
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");

/**
 * Express
 */
const express = require("express");
const session = require("express-session");
const cors = require("cors");

/**
 * OAuth middleware
 */
const oauth = require("./src/auth");

/**
 * Configure dotenv in development environment
 */
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

/**
 * Initial setup
 */
const app = express();
app.use(cors("*"));
app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.JWT_SECRET,
	})
);

/**
 * Load in client directories
 */
app.use(express.static(path.join(__dirname, "../client/build")));

/**
 * Handle client routes
 */
const clientRoutes = ["/", "/app", "/sign-in", "/sign-up"];
clientRoutes.forEach((route) => {
	app.get(route, (req, res) => {
		res.sendFile(path.join(__dirname, "../client/build", "index.html"));
	});
});

/**
 * Configure OAuth routes and callbacks.
 */
oauth(app);

/**
 * Apollo Server setup
 */
const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");
const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	context: ({ req }) => ({ req }),
});
server.applyMiddleware({ app });

/**
 * Spin up the server
 */
mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return app.listen(process.env.PORT || 3000);
	});

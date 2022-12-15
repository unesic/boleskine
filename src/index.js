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
const oauth = require("./auth");

/**
 * Configure dotenv in development environment
 */
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
console.log({ env: process.env });
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

if (process.env.NODE_ENV === "production") {
	console.log(process.env.NODE_ENV);
	/**
	 * Load in client directories
	 */
	app.use(express.static(path.join(__dirname, "./src/client/dist")));

	/**
	 * Handle client routes
	 */
	const clientRoutes = ["/", "/app", "/sign-in", "/sign-up"];
	clientRoutes.forEach((route) => {
		app.get(route, (req, res) => {
			res.sendFile(path.join(__dirname, "./src/client/dist", "index.html"));
		});
	});
}

/**
 * Configure OAuth routes and callbacks.
 */
oauth(app);

/**
 * Apollo Server setup./src/graphql/typeDefs
 */
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
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

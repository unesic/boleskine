const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const oauth = require("./src/auth");

const app = express();

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

app.use(cors("*"));

app.use("/assets", express.static(path.join(process.cwd(), "assets")));
app.use("/images", express.static(path.join(process.cwd(), "images")));

if (process.env.NODE_ENV == "production") {
	app.use(express.static(path.join(process.cwd(), "/client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(process.cwd(), "/client/build"));
	});
}

app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.JWT_SECRET,
	})
);

oauth(app);

server.applyMiddleware({ app });

mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return app.listen(process.env.PORT || 3000);
	});

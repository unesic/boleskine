const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const oauth = require("./src/auth");

const app = express();

dotenv.config();

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

app.use(cors("*"));
const assetsDir = path.join(process.cwd(), "assets");
const imagesDir = path.join(process.cwd(), "images");
app.use("/assets", express.static(assetsDir));
app.use("/images", express.static(imagesDir));

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
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

const { ApolloServer } = require("apollo-server-express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

dotenv.config();

const typeDefs = require("./src/graphql/typeDefs");
const resolvers = require("./src/graphql/resolvers");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

const dir = path.join(process.cwd(), "assets");
app.use(cors("*"));
app.use("/assets", express.static(dir));

server.applyMiddleware({ app });

mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return app.listen(process.env.PORT || 5000);
	});

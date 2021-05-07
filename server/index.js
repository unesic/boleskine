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

const dir = path.join(process.cwd(), "assets");
app.use(cors("*"));
app.use("/assets", express.static(dir));

app.use(
	session({
		resave: false,
		saveUninitialized: true,
		secret: process.env.JWT_SECRET,
	})
);

oauth(app);

server.applyMiddleware({ app });

mongoose.set("useFindAndModify", false);
mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		return app.listen(process.env.PORT || 5000);
	});

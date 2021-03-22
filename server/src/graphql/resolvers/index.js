const usersResolvers = require("./users.resolver");
const exampleResolvers = require("./example.resolver");

module.exports = {
	Query: {
		...usersResolvers.Query,
		...exampleResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...exampleResolvers.Mutation,
	},
};

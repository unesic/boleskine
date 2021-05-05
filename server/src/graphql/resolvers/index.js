const usersResolvers = require("./users.resolver");
const monthsResolvers = require("./months.resolver");
const entriesResolvers = require("./entries.resolver");

module.exports = {
	Query: {
		...usersResolvers.Query,
		...monthsResolvers.Query,
		...entriesResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...monthsResolvers.Mutation,
		...entriesResolvers.Mutation,
	},
};

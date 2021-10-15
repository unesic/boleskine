const usersResolvers = require("./users.resolver");
const monthsResolvers = require("./months.resolver");
const entriesResolvers = require("./entries.resolver");
const filesResolvers = require("./files.resolver");

module.exports = {
	Query: {
		...usersResolvers.Query,
		...monthsResolvers.Query,
		...entriesResolvers.Query,
		...filesResolvers.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...monthsResolvers.Mutation,
		...entriesResolvers.Mutation,
		...filesResolvers.Mutation,
	},
};

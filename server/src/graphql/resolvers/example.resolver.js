const { AuthenticationError } = require("apollo-server");

const Example = require("../../models/Example.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Query: {
		exampleGet: async (_, { id }) => {
			try {
				const example = await Example.findById(id);
				return example;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		exampleCreate: async (_, { type, foo }, context) => {
			const user = checkAuth(context);

			const newExample = new Example({
				userId: user.id,
				type,
				foo,
			});

			const example = await newExample.save();
			return example;
		},
	},
};

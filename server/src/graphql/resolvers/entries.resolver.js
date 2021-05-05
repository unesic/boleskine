const Entries = require("../../models/Entries.model");
const Months = require("../../models/Months.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Query: {
		getAllEntries: async () => {
			try {
				const entries = await Entries.find();
				return entries;
			} catch (err) {
				throw new Error(err);
			}
		},
		getEntry: async (_, { id }) => {
			try {
				const entry = await Entries.findById(id);
				return entry;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createEntry: async (
			_,
			{ monthId, timestamp, description, type, amount },
			context
		) => {
			const user = checkAuth(context);

			const newEntry = new Entries({
				userId: user.id,
				monthId,
				timestamp,
				description,
				type,
				amount,
			});

			const month = await Months.findById(monthId);
			month.entries.push(newEntry.id);

			const entry = await newEntry.save();
			await month.save();
			return entry;
		},
		deleteEntry: async (_, { id }, context) => {
			const reqUser = checkAuth(context);

			try {
				const entry = await Entries.findById(id);
				if (entry && entryuserId.toString() === reqUser.id) {
					const month = await Months.findById(entry.monthId);
					month.entries = month.entries.filter((entryId) => entryId !== id);

					await entry.delete();
					await month.save();

					return "Entry data deleted!";
				} else {
					return AuthenticationError("Action not allowed!");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

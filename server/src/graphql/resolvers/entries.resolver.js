const { AuthenticationError } = require("apollo-server-errors");
const Entry = require("../../models/Entry.model");
const Month = require("../../models/Month.model");
const checkAuth = require("../../util/check-auth");

module.exports = {
	Query: {
		getAllEntries: async () => {
			try {
				const entries = await Entry.find();
				return entries;
			} catch (err) {
				throw new Error(err);
			}
		},
		getEntry: async (_, { id }) => {
			try {
				const entry = await Entry.findById(id);
				return entry;
			} catch (err) {
				throw new Error(err);
			}
		},
		getUserEntries: async (_, __, context) => {
			const user = checkAuth(context);

			try {
				const entries = await Entry.find({ userId: user.id });
				return entries;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createEntry: async (
			_,
			{ monthId, date, timestamp, description, type, amount },
			context
		) => {
			const user = checkAuth(context);
			let res;

			const newEntry = new Entry({
				userId: user.id,
				description,
				timestamp,
				amount,
				type,
			});

			if (monthId) {
				/**
				 * If `monthId` is passed
				 * 	• find a month
				 * 	• set its `id` to `newEntry.monthId`
				 * 	• save `newEntry`
				 * 	• add `newEntry.id` to `month.entries`
				 * 	• save `newMonth`
				 */
				const month = await Month.findById(monthId);

				newEntry.monthId = month.id;
				res = await newEntry.save();

				month.entries.push(res.id);
				await month.save();
			} else {
				/**
				 * If `monthId` isn't passed
				 * 	• create a new month
				 * 	• save it
				 * 	• set its `id` to `newEntry.monthId`
				 * 	• save `newEntry`
				 * 	• add its `id` to `newMonth.entries`
				 * 	• save `newMonth`
				 */
				const month = new Month({ userId: user.id, date: date });
				const newMonth = await month.save();

				newEntry.monthId = newMonth.id;
				res = await newEntry.save();

				newMonth.entries = [res.id];
				await newMonth.save();
			}

			return res;
		},
		updateEntry: async (
			_,
			{ id, timestamp, description, type, amount },
			context
		) => {
			const user = checkAuth(context);

			try {
				const entry = await Entry.findOneAndUpdate(
					{ _id: id, userId: user.id },
					{
						...(description && { description }),
						...(timestamp && { timestamp }),
						...(amount && { amount }),
						...(type && { type }),
					},
					{ new: true }
				);

				return entry;
			} catch (err) {
				throw new Error(err);
			}
		},
		deleteEntry: async (_, { id }, context) => {
			const reqUser = checkAuth(context);

			try {
				const entry = await Entry.findById(id);

				if (entry && entry.userId.toString() === reqUser.id) {
					const month = await Month.findById(entry.monthId);
					month.entries = month.entries.filter((entryId) => entryId !== id);

					await entry.deleteOne();
					await month.save();

					return entry;
				} else {
					throw new AuthenticationError("Action not allowed!");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

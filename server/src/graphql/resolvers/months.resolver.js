const { AuthenticationError } = require("apollo-server-errors");
const { Types } = require("mongoose");
const checkAuth = require("../../util/check-auth");
const Users = require("../../models/Users.model");
const Months = require("../../models/Months.model");
const Entries = require("../../models/Entries.model");

module.exports = {
	Query: {
		getMonth: async (_, { id }, context) => {
			const user = checkAuth(context);

			try {
				const month = await Months.findById(id);
				if (month.userId.toString() === user.id) {
					const entries = await Entries.find({
						_id: {
							$in: month.entries.map((entryId) => Types.ObjectId(entryId)),
						},
					});

					return {
						...month._doc,
						id: month._id,
						entries: entries,
					};
				} else {
					return AuthenticationError("Action not allowed!");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createMonth: async (_, { date, entries }, context) => {
			const user = checkAuth(context);
			const month = await Months.findOne({ date });

			if (month && month.userId.toString() === user.id) {
				throw new Error("User already has a month with specified date!");
			}

			const newMonth = new Months({
				userId: user.id,
				date,
				entries,
			});

			const res = await newMonth.save();
			return res;
		},
		updateMonth: async (_, { id, entries }, context) => {
			checkAuth(context);

			const res = await Months.findByIdAndUpdate(
				id,
				{ entries },
				{ new: true }
			);

			return {
				...res._doc,
				id: res._id,
			};
		},
		deleteMonth: async (_, { id }, context) => {
			const user = checkAuth(context);

			try {
				const month = await Months.findById(id);

				if (month && month.userId.toString() === user.id) {
					await month.delete();
					return "Month data deleted!";
				} else {
					return AuthenticationError("Action not allowed!");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

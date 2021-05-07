const { AuthenticationError } = require("apollo-server-errors");
const { Types } = require("mongoose");
const checkAuth = require("../../util/check-auth");
const User = require("../../models/User.model");
const Month = require("../../models/Month.model");
const Entry = require("../../models/Entry.model");

module.exports = {
	Query: {
		getMonth: async (_, { id }, context) => {
			const user = checkAuth(context);

			try {
				const month = await Month.findById(id);
				if (month.userId.toString() === user.id) {
					const entries = await Entry.find({
						_id: {
							$in: month.entries.map((eId) => Types.ObjectId(eId)),
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
		getUserMonths: async (_, __, context) => {
			const user = checkAuth(context);

			try {
				const months = await Month.find({ userId: user.id });

				return months.map(async (month) => {
					const entries = await Entry.find({
						_id: {
							$in: month.entries.map((eId) => Types.ObjectId(eId)),
						},
					});

					return {
						...month._doc,
						id: month._id,
						entries: entries,
					};
				});
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createMonth: async (_, { date }, context) => {
			const user = checkAuth(context);
			const month = await Month.findOne({ date });

			if (month && month.userId.toString() === user.id) {
				throw new Error("User already has a month with specified date!");
			}

			const newMonth = new Month({
				userId: user.id,
				date,
			});

			const res = await newMonth.save();
			return res;
		},
		// updateMonth: async (_, { id, entries }, context) => {
		// 	checkAuth(context);

		// 	const res = await Months.findByIdAndUpdate(
		// 		id,
		// 		{ entries },
		// 		{ new: true }
		// 	);

		// 	return {
		// 		...res._doc,
		// 		id: res._id,
		// 	};
		// },
		deleteMonth: async (_, { id }, context) => {
			const user = checkAuth(context);

			try {
				const month = await Month.findById(id);

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

const { model, Schema } = require("mongoose");

const monthsSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		entries: [
			{
				type: String,
				required: false,
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = model("Months", monthsSchema);

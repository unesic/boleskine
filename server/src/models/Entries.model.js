const { model, Schema } = require("mongoose");

const entrySchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		monthId: {
			type: Schema.Types.ObjectId,
			ref: "Months",
			required: true,
		},
		timestamp: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		amount: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Entries", entrySchema);

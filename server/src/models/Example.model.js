const { model, Schema } = require("mongoose");

const exampleSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		foo: {
			type: Boolean,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Example", exampleSchema);

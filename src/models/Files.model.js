const { model, Schema } = require("mongoose");

const filesSchema = new Schema(
	{
		filename: String,
		mimetype: String,
		path: String,
	},
	{
		timestamps: true,
	}
);

module.exports = model("Files", filesSchema);

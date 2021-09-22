const { model, Schema } = require("mongoose");

const usersSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: String,
		firstName: String,
		lastName: String,
		image: String,
		language: String,
		currency: String,
		darkMode: Boolean,
	},
	{
		timestamps: true,
	}
);

module.exports = model("Users", usersSchema);

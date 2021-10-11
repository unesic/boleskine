const { model, Schema } = require("mongoose");

const usersSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: String,
		firstName: {
			type: String,
			required: false,
			default: "",
		},
		lastName: {
			type: String,
			required: false,
			default: "",
		},
		image: {
			type: String,
			required: false,
			default: "",
		},
		language: {
			type: String,
			required: false,
			default: "en",
		},
		currency: {
			type: String,
			required: false,
			default: "EUR",
		},
		darkMode: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = model("Users", usersSchema);

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
	validateRegisterInput,
	validateLoginInput,
	validateUpdateInput,
} = require("../../util/validators");
const Users = require("../../models/Users.model");

const generateToken = (user, remember) => {
	return jwt.sign(
		{
			id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			image: user.image,
			email: user.email,
		},
		process.env.JWT_SECRET,
		remember ? {} : { expiresIn: "7d" }
	);
};

module.exports = {
	Query: {
		getAllUsers: async () => {
			try {
				const users = await Users.find();
				return users;
			} catch (err) {
				throw new Error(err);
			}
		},
		getUser: async (_, { userId }) => {
			try {
				const user = await Users.findById(userId);
				if (user) {
					return user;
				} else {
					throw new Error("User not found");
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		createUser: async (_, { email, password, rePassword }) => {
			const { valid, errors } = validateRegisterInput(
				email,
				password,
				rePassword
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const userMail = await Users.findOne({ email });

			if (userMail) {
				throw new UserInputError("Email is taken", {
					errors: {
						email: "This email is taken",
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new Users({
				email,
				password,
			});
			const res = await newUser.save();
			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token: token,
			};
		},
		loginUser: async (_, { email, password, remember }) => {
			const { errors, valid } = validateLoginInput(email, password);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const user = await Users.findOne({ email });

			if (!user) {
				errors.general = "User not found";
				throw new UserInputError("User not found", { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.general = "Wrong credentials";
				throw new UserInputError("Wrong credentials", { errors });
			}

			const token = generateToken(user, remember);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		updateUser: async (_, { id, email, password, rePassword }) => {
			const { valid, errors } = validateUpdateInput(
				email,
				password,
				rePassword
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const userMail = await Users.findOne({ email });

			if (userMail && userMail.id !== id) {
				throw new UserInputError("Email is taken", {
					errors: {
						email: "This email is taken",
					},
				});
			}

			const currUser = await Users.findById(id);

			if (password) {
				password = await bcrypt.hash(password, 12);
			}

			const res = await Users.findByIdAndUpdate(
				id,
				{
					username: username || currUser.username,
					email: email || currUser.email,
					password: password || currUser.password,
				},
				{ new: true }
			);

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
		authUser: async (_, { email, firstName, lastName, image }) => {
			const currUser = await Users.findOne({ email });
			let user;

			if (currUser) {
				if (!currUser.firstName || currUser.firstName === "") {
					currUser.firstName = firstName;
				}

				if (!currUser.lastName || currUser.lastName === "") {
					currUser.lastName = lastName;
				}

				if (!currUser.image || currUser.image === "") {
					currUser.image = image;
				}

				user = await currUser.save();
			} else if (!currUser) {
				const newUser = new Users({
					email,
					firstName,
					lastName,
					image,
				});
				user = await newUser.save();
			}

			const token = generateToken(currUser);

			return {
				...user._doc,
				id: user._id,
				token: token,
			};
		},
	},
};

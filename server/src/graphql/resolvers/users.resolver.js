const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
	validateRegisterInput,
	validateLoginInput,
	validateUpdateInput,
} = require("../../util/validators");
const User = require("../../models/User.model");
const checkAuth = require("../../util/check-auth");

const generateToken = (user, remember) => {
	return jwt.sign(
		{
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			image: user.image,
		},
		process.env.JWT_SECRET,
		remember ? {} : { expiresIn: "7d" }
	);
};

module.exports = {
	Query: {
		getAllUsers: async () => {
			try {
				const users = await User.find();
				return users;
			} catch (err) {
				throw new Error(err);
			}
		},
		getUser: async (_, { userId }) => {
			try {
				const user = await User.findById(userId);
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

			const userMail = await User.findOne({ email });

			if (userMail) {
				throw new UserInputError("Email is taken", {
					errors: {
						email: "This email is taken",
					},
				});
			}

			password = await bcrypt.hash(password, 12);

			const newUser = new User({ email, password });
			newUser.image = `https://avatars.dicebear.com/api/identicon/${newUser.id}.svg?size=100`;

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

			const user = await User.findOne({ email });

			if (!user) {
				errors.email = "The email you entered isn’t connected to an account.";
				throw new UserInputError("Wrong email", { errors });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.password = "The password you’ve entered is incorrect.";
				throw new UserInputError("Wrong password", { errors });
			}

			const token = generateToken(user, remember);

			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
		updateUser: async (
			_,
			{
				id,
				email,
				password,
				rePassword,
				firstName,
				lastName,
				image,
				language,
				currency,
				darkMode,
			}
		) => {
			const { valid, errors } = validateUpdateInput(
				email,
				password,
				rePassword
			);

			if (!valid) {
				throw new UserInputError("Errors", { errors });
			}

			const userMail = await User.findOne({ email });

			if (userMail && userMail.id !== id) {
				throw new UserInputError("Email is taken", {
					errors: {
						email: "This email is taken",
					},
				});
			}

			const currUser = await User.findById(id);

			if (password) {
				password = await bcrypt.hash(password, 12);
			}

			const res = await User.findByIdAndUpdate(
				id,
				{
					email: email || currUser.email,
					password: password || currUser.password,
					firstName: firstName ?? currUser.firstName,
					lastName: lastName ?? currUser.lastName,
					image: image ?? currUser.image,
					language: language || currUser.language,
					currency: currency || currUser.currency,
					darkMode: darkMode !== undefined ? darkMode : currUser.darkMode,
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
		authUser: async (_, { email, firstName, lastName, image }, context) => {
			if (context.req.headers.authorization) {
				const req = checkAuth(context);
				console.log(req);
				if (req) {
					const currUser = await User.findOne({ email: req.email });
					const token = generateToken(currUser);

					return {
						...currUser._doc,
						id: currUser._id,
						token: token,
					};
				}
			}

			const currUser = await User.findOne({ email });
			let user;

			if (currUser) {
				if (!currUser.firstName) currUser.firstName = firstName;
				if (!currUser.lastName) currUser.lastName = lastName;
				if (!currUser.image) currUser.image = image;

				user = await currUser.save();
			} else {
				const newUser = new User({
					email,
					firstName,
					lastName,
					image,
					firstName: "",
					lastName: "",
					image: "",
					language: "en",
					currency: "EUR",
					darkMode: true,
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

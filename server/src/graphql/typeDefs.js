const { gql } = require("apollo-server");

module.exports = gql`
	type User {
		id: ID!
		email: String!
		firstName: String
		lastName: String
		image: String
		token: String!
		createdAt: String
		updatedAt: String
		language: String
		currency: String
		darkMode: Boolean
	}

	type Entry {
		id: ID!
		userId: ID!
		monthId: ID!
		timestamp: String!
		description: String!
		type: String!
		amount: String
		createdAt: String
		updatedAt: String
	}

	type Month {
		id: ID!
		userId: ID!
		date: String!
		entries: [Entry]
	}

	type File {
		id: ID!
		filename: String!
		mimetype: String!
		path: String!
	}

	type Query {
		getAllUsers: [User]
		getUser(userId: ID!): User

		getAllEntries: [Entry]
		getEntry(id: ID!): Entry
		getUserEntries: [Entry]

		getMonth(id: ID!): Month
		getUserMonths: [Month]

		getFile(fileId: ID!): File!
	}

	type Mutation {
		createUser(email: String!, password: String!, rePassword: String!): User!
		loginUser(email: String!, password: String!, remember: Boolean!): User
		updateUser(
			id: ID!
			email: String
			password: String
			rePassword: String
			firstName: String
			lastName: String
			image: String
			language: String
			currency: String
			darkMode: Boolean
		): User!
		authUser(
			email: String
			firstName: String
			lastName: String
			image: String
		): User

		createMonth(date: String!): Month
		deleteMonth(id: ID!): String

		createEntry(
			monthId: ID
			date: String!
			timestamp: String!
			description: String!
			type: String!
			amount: String
		): Entry
		updateEntry(
			id: ID!
			timestamp: String
			description: String
			type: String
			amount: String
		): Entry
		deleteEntry(id: ID!): Entry

		singleUpload(file: Upload!): File!
	}
`;

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
	}

	type Entry {
		id: ID!
		userId: ID!
		monthId: ID!
		timestamp: String!
		description: String!
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

	type Query {
		getAllUsers: [User]
		getUser(userId: ID!): User

		getAllEntries: [Entry]
		getEntry(id: ID!): Entry

		getMonth(id: ID!): Month
	}

	type Mutation {
		createUser(email: String!, password: String!, rePassword: String!): User!
		loginUser(email: String!, password: String!, remember: Boolean!): User
		updateUser(
			id: ID!
			email: String
			password: String
			rePassword: String
		): User!
		authUser(
			email: String!
			firstName: String
			lastName: String
			image: String
		): User

		createMonth(date: String!, entries: [ID]): Month
		updateMonth(entries: [ID]): Month
		deleteMonth(id: ID!): String

		createEntry(
			monthId: ID!
			timestamp: String!
			description: String!
			type: String!
			amount: String
		): Entry
		deleteEntry(id: ID!): String
	}
`;

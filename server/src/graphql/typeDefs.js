const { gql } = require("apollo-server");

module.exports = gql`
	type User {
		id: ID!
		email: String!
		token: String!
	}

	type Example {
		id: ID!
		userId: ID!
		type: String!
		foo: Boolean
	}

	type Query {
		getUser(userId: ID!): User
		exampleGet(id: ID!): Example
	}

	type Mutation {
		createUser(
			email: String!
			password: String!
			rePassword: String!
		): User!
		loginUser(email: String!, password: String!, remember: Boolean!): User
		updateUser(
			id: ID!
			email: String
			password: String
			rePassword: String
		): User!
		exampleCreate(type: String!, foo: Boolean): Example!
	}
`;

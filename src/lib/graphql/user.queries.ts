import gql from "graphql-tag";

const USER_REGISTER = gql`
	mutation createUser(
		$email: String!
		$password: String!
		$rePassword: String!
	) {
		createUser(
			email: $email
			password: $password
			rePassword: $rePassword
		) {
			id
			email
			token
		}
	}
`;

const USER_LOGIN = gql`
	mutation loginUser(
		$email: String!
		$password: String!
		$remember: Boolean!
	) {
		loginUser(email: $email, password: $password, remember: $remember) {
			id
			email
			token
		}
	}
`;

const USER_UPDATE = gql`
	mutation updateUser(
		$id: ID!
		$email: String!
		$password: String!
		$rePassword: String!
	) {
		updateUser(id: $id, password: $password, rePassword: $rePassword) {
			id
			email
			token
		}
	}
`;

export { USER_REGISTER, USER_LOGIN, USER_UPDATE };

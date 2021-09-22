import gql from "graphql-tag";

const GET_USER = gql`
	query getUser($userId: ID!) {
		getUser(userId: $userId) {
			id
			email
			firstName
			lastName
			image
			language
			currency
			darkMode
		}
	}
`;

const USER_SIGNUP = gql`
	mutation createUser(
		$email: String!
		$password: String!
		$rePassword: String!
		$language: String
		$currency: String
		$darkMode: String
	) {
		createUser(
			email: $email
			password: $password
			rePassword: $rePassword
			language: $language
			currency: $currency
			darkMode: $darkMode
		) {
			id
			email
			firstName
			lastName
			image
			language
			currency
			darkMode
			token
		}
	}
`;

const USER_LOGIN = gql`
	mutation loginUser($email: String!, $password: String!, $remember: Boolean!) {
		loginUser(email: $email, password: $password, remember: $remember) {
			id
			email
			firstName
			lastName
			image
			language
			currency
			darkMode
			token
		}
	}
`;

const USER_UPDATE = gql`
	mutation updateUser(
		$id: ID!
		$email: String
		$password: String
		$rePassword: String
		$firstName: String
		$lastName: String
		$image: String
		$language: String
		$currency: String
		$darkMode: Boolean
	) {
		updateUser(
			id: $id
			email: $email
			password: $password
			rePassword: $rePassword
			firstName: $firstName
			lastName: $lastName
			image: $image
			language: $language
			currency: $currency
			darkMode: $darkMode
		) {
			id
			email
			firstName
			lastName
			image
			language
			currency
			darkMode
			token
		}
	}
`;

const USER_AUTH = gql`
	mutation authUser(
		$email: String
		$firstName: String
		$lastName: String
		$image: String
	) {
		authUser(
			email: $email
			firstName: $firstName
			lastName: $lastName
			image: $image
		) {
			id
			email
			firstName
			lastName
			image
			language
			currency
			darkMode
			token
		}
	}
`;

export { GET_USER, USER_SIGNUP, USER_LOGIN, USER_UPDATE, USER_AUTH };

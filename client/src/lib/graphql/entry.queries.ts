import gql from "graphql-tag";

const GET_ENTRY = gql`
	query getEntry($id: ID!) {
		getEntry(id: $id) {
			id
			monthId
			timestamp
			description
			amount
			type
		}
	}
`;

const GET_USER_ENTRIES = gql`
	query getUserEntries {
		getUserEntries {
			id
			monthId
			timestamp
			description
			amount
			type
		}
	}
`;

const CREATE_ENTRY = gql`
	mutation createEntry(
		$monthId: ID
		$date: String!
		$timestamp: String!
		$description: String!
		$type: String!
		$amount: String
	) {
		createEntry(
			monthId: $monthId
			date: $date
			timestamp: $timestamp
			description: $description
			type: $type
			amount: $amount
		) {
			id
			monthId
			timestamp
			description
			amount
			type
		}
	}
`;

const UPDATE_ENTRY = gql`
	mutation updateEntry(
		$id: ID!
		$description: String
		$type: String
		$amount: String
	) {
		updateEntry(
			id: $id
			description: $description
			type: $typ
			amount: $amount
		) {
			id
			monthId
			timestamp
			description
			amount
			type
		}
	}
`;

const DELETE_ENTRY = gql`
	mutation deleteEntry($id: ID!) {
		deleteEntry(id: $id)
	}
`;

export {
	GET_ENTRY,
	GET_USER_ENTRIES,
	CREATE_ENTRY,
	UPDATE_ENTRY,
	DELETE_ENTRY,
};

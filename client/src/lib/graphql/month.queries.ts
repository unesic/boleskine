import gql from "graphql-tag";

const GET_MONTH = gql`
	query getMonth($id: ID!) {
		getMonth(id: $id) {
			id
			date
			entries {
				id
				monthId
				timestamp
				description
				type
				amount
			}
		}
	}
`;

const GET_USER_MONTHS = gql`
	query getUserMonths {
		getUserMonths {
			id
			date
			entries {
				id
				monthId
				timestamp
				description
				type
				amount
			}
		}
	}
`;

const CREATE_MONTH = gql`
	mutation createMonth($date: String!) {
		createMonth(date: $date) {
			id
			date
			entries
		}
	}
`;

export { GET_MONTH, GET_USER_MONTHS, CREATE_MONTH };

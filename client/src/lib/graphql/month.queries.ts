import gql from "graphql-tag";

export const GET_MONTH = gql`
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

export const GET_USER_MONTHS = gql`
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

export const CREATE_MONTH = gql`
	mutation createMonth($date: String!) {
		createMonth(date: $date) {
			id
			date
			entries
		}
	}
`;

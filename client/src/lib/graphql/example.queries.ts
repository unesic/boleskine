import gql from "graphql-tag";

const CREATE = gql`
	mutation exampleCreate($id: ID!, $type: String!, $foo: boolean) {
		exampleCreate(id: $id, type: $type, foo: $foo) {
			id
			type
			foo
		}
	}
`;

const GET = gql`
	query exampleGet($id: ID!) {
		exampleGet(id: $id) {
			id
			data
		}
	}
`;

export { CREATE, GET };

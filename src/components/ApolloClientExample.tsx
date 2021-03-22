import React from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { GET, CREATE } from "lib/graphql/example.queries";

interface ApolloClientExampleProps {}

export const ApolloClientExample: React.FC<ApolloClientExampleProps> = () => {
	const { loading, error, data } = useQuery(GET);

	const [exampleGet] = useLazyQuery(GET, {
		onCompleted({ exampleGet }) {
			console.log(exampleGet);
		},
		onError(err) {
			console.log(err);
		},
	});

	const [exampleCreate] = useMutation(CREATE, {
		onCompleted({ exampleCreate }) {
			console.log(exampleCreate);
		},
		onError(err) {
			console.log(err);
		},
	});

	return <div>ApolloClientExample</div>;
};

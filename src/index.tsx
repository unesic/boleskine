import React from "react";
import ReactDOM from "react-dom";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import "assets/app.css";
import "lib/Object.filter";
import { App } from "App";
import { AuthProvider } from "lib/AuthContext";

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("auth-token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(
		createHttpLink({
			uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
		})
	),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

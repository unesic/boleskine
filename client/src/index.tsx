/**
 * Base
 */
import React from "react";
import ReactDOM from "react-dom";
import "assets/dist/main.css";

/**
 * Apollo
 */
import { setContext } from "@apollo/client/link/context";
import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from "@apollo/client";

/**
 * Redux
 */
import { Provider } from "react-redux";
import { Store } from "store";

/**
 * Components
 */
import { App } from "App";

const httpLink = createHttpLink({
	uri: `${process.env.REACT_APP_SERVER_URL}/graphql`,
});

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
	link: authLink.concat(httpLink),
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Provider store={Store}>
				<App />
			</Provider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

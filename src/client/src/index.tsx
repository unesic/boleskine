/**
 * Base
 */
import React from "react";
import ReactDOM from "react-dom";

/**
 * Apollo
 */
import { setContext } from "@apollo/client/link/context";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

/**
 * Redux
 */
import { Provider } from "react-redux";
import { Store } from "store";

/**
 * Components
 */
import { App } from "App";

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("x-boleskine-unesic-auth");
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
		createUploadLink({
			uri:
				process.env.NODE_ENV === "production"
					? "/graphql"
					: `${process.env.REACT_APP_SERVER_URL}/graphql`,
		})
	),
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

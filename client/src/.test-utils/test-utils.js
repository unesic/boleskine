/**
 * Base
 */
import "./mediaMock";
import { render } from "@testing-library/react";

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
 * Router
 */
import { BrowserRouter, Switch } from "react-router-dom";

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

const AllTheProviders = ({ children }) => {
	return (
		<ApolloProvider client={client}>
			<Provider store={Store}>
				<BrowserRouter>
					<Switch>{children}</Switch>
				</BrowserRouter>
			</Provider>
		</ApolloProvider>
	);
};

const customRender = (ui, options) =>
	render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

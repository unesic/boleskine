import { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { AuthContext } from "lib/AuthContext";
import { PrivateRoute } from "lib/PrivateRoute";
import { PublicRoute } from "lib/PublicRoute";

import { Home } from "views/Home";
import { LogIn } from "views/LogIn";
import { SignUp } from "views/SignUp";

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
	const { logoutUser } = useContext(AuthContext);
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute exact path="/" component={Home} />
				<PublicRoute exact path="/signup" component={SignUp} />
				<PublicRoute exact path="/login" component={LogIn} />
				<Route
					exact
					path="/logout"
					render={() => {
						logoutUser();
						return <Redirect to="/" />;
					}}
				/>
			</Switch>
		</BrowserRouter>
	);
};

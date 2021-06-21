import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import { PrivateRoute } from "lib/PrivateRoute";
import { PublicRoute } from "lib/PublicRoute";

import { Home } from "views/Home";
import { LogIn } from "views/LogIn";
import { SignUp } from "views/SignUp";
import { Profile } from "views/Profile";

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute exact path="/" component={Home} />
				<PublicRoute exact path="/signup" component={SignUp} />
				<PublicRoute exact path="/login" component={LogIn} />
				<PrivateRoute path="/u/:id" component={Profile} />
				<Route exact path="/logout" render={() => <Redirect to="/" />} />
			</Switch>
		</BrowserRouter>
	);
};

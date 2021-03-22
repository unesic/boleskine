import { PrivateRoute } from "lib/PrivateRoute";
import PublicRoute from "lib/PublicRoute";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "views/Home";
import { Login } from "views/Login";
import { Register } from "views/Register";

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute exact path="/" component={Home} />
				<PublicRoute exact path="/register" component={Register} />
				<PublicRoute exact path="/login" component={Login} />
				<Route exact path="/test" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

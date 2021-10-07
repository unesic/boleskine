/**
 * Base
 */
import { lazy, memo } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

/**
 * Routes
 */
import { PrivateRoute } from "lib/routes/PrivateRoute";
import { PublicRoute } from "lib/routes/PublicRoute";

/**
 * Views
 */
import { Home } from "views/Home";
const SignUp = lazy(() => import("views/SignUp"));
const SignIn = lazy(() => import("views/SignIn"));
const SignOut = lazy(() => import("views/SignOut"));

interface RouterProps {}

export const Router: React.FC<RouterProps> = memo(() => {
	return (
		<BrowserRouter>
			<Switch>
				<PublicRoute exact path="/sign-up" component={SignUp} />
				<PublicRoute exact path="/sign-in" component={SignIn} />
				<PrivateRoute exact path="/sign-out" component={SignOut} />
				<PrivateRoute exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
});

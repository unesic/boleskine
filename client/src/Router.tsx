/**
 * Base
 */
import { BrowserRouter, Switch } from "react-router-dom";
import { PrivateRoute } from "lib/routes/PrivateRoute";
import { PublicRoute } from "lib/routes/PublicRoute";

/**
 * Views
 */
import { SignUp } from "views/SignUp";
import { SignIn } from "views/SignIn";
import { Home } from "views/Home";
import { SignOut } from "views/SignOut";

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
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
};

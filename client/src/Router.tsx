/**
 * Base
 */
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { PrivateRoute } from "lib/routes/PrivateRoute";
import { PublicRoute } from "lib/routes/PublicRoute";

/**
 * Views
 */
import { SignUp } from "views/SignUp";
import { SignIn } from "views/SignIn";
import { Home } from "views/Home";

/**
 * UI Components
 */
import { Notifications } from "ui/misc/Notifications";
import { EntryOptions } from "ui/misc/EntryOptions";
import { Topbar } from "ui/misc/Topbar";

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
	return (
		<BrowserRouter>
			<Topbar />

			<main className="max-w-5xl mx-auto mt-8 pb-8">
				<Switch>
					<PublicRoute exact path="/sign-up" component={SignUp} />
					<PublicRoute exact path="/sign-in" component={SignIn} />
					<PrivateRoute exact path="/" component={Home} />
					<PrivateRoute
						exact
						path="/sign-ou"
						render={() => <Redirect to="/" />}
					/>
				</Switch>
			</main>

			<Notifications position="tr" />
			<EntryOptions />
		</BrowserRouter>
	);
};

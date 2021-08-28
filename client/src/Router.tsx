/**
 * Base
 */
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { PrivateRoute } from "lib/PrivateRoute";
import { PublicRoute } from "lib/PublicRoute";

/**
 * Views
 */
import { Home } from "views/Home";
import { LogIn } from "views/LogIn";
import { SignUp } from "views/SignUp";
import { Profile } from "views/Profile";
import { Analytics } from "views/Analytics";

/**
 * Components
 */
import { Sidebar } from "components/Sidebar";
import { Notifications } from "ui/misc/Notifications";
import { EntryOptions } from "ui/EntryOptions";

interface RouterProps {}

export const Router: React.FC<RouterProps> = () => {
	return (
		<BrowserRouter>
			<div className="grid grid-cols-12 py-8 2xl:px-0 px-4 2xl:container 2xl:mx-auto">
				<Sidebar />

				<main className="col-span-10 relative">
					<Switch>
						<PublicRoute exact path="/signup" component={SignUp} />
						<PublicRoute exact path="/login" component={LogIn} />

						<PrivateRoute exact path="/" component={Home} />
						<PrivateRoute exact path="/analytics" component={Analytics} />

						<PrivateRoute path="/u/:id" component={Profile} />
						<PrivateRoute
							exact
							path="/logout"
							render={() => <Redirect to="/" />}
						/>
					</Switch>
				</main>

				<Notifications position="tr" />
				<EntryOptions />
			</div>
		</BrowserRouter>
	);
};

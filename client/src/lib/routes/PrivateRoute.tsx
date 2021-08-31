import { Redirect, Route, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";
import { Topbar } from "ui/misc/Topbar";
import { Notifications } from "ui/misc/Notifications";
import { EntryOptions } from "ui/misc/EntryOptions";
import { ConfirmationPoup } from "ui/misc/ConfirmationPoup";

interface PrivateRouteProps {
	[key: string]: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
	component: Component,
	...rest
}) => {
	const user = useSelector(selectUser);
	const location = useLocation();

	return (
		<>
			<Topbar />
			<main className="lg:max-w-5xl container mx-auto mt-8 pb-8">
				<Route
					{...rest}
					render={(props) =>
						user ? (
							<Component {...props} />
						) : (
							<Redirect
								to={{ pathname: "/sign-in", state: { from: location } }}
							/>
						)
					}
				/>
			</main>

			<Notifications position="tr" />
			<EntryOptions />
			<ConfirmationPoup />
		</>
	);
};

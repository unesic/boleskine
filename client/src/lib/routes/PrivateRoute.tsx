import { Redirect, Route, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

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
		<Route
			{...rest}
			render={(props) =>
				user ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: "/login", state: { from: location } }} />
				)
			}
		/>
	);
};

/**
 * Base
 */
import { Redirect, Route } from "react-router-dom";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

interface PublicRouteProps {
	[key: string]: any;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
	component: Component,
	...rest
}) => {
	const user = useSelector(selectUser);

	return (
		<Route
			{...rest}
			render={(props) =>
				user.id ? (
					<Redirect
						to={{
							pathname: "/",
							state: { msg: "You are already logged in!" },
						}}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

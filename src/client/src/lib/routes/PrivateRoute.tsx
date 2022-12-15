/**
 * Base
 */
import { useMemo } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

interface PrivateRouteProps {
	component: React.FC<any>;
	[key: string]: any;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
	component: Component,
	...rest
}) => {
	const user = useSelector(selectUser);
	const location = useLocation();

	const page = useMemo(() => location.pathname.replaceAll("/", "") || "home", [
		location,
	]);

	return (
		<div
			className={`Page--${page}`}
			style={{ height: page !== "home" ? "100vh" : undefined }}
		>
			<main className="Main">
				<Route
					{...rest}
					render={(props) =>
						user.id ? (
							<Component {...props} />
						) : (
							<Redirect
								to={{ pathname: "/sign-in", state: { from: location } }}
							/>
						)
					}
				/>
			</main>
		</div>
	);
};

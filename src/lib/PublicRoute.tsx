import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthContext } from "lib/AuthContext";

interface PublicRouteProps {
	[key: string]: any;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
	component: Component,
	...rest
}) => {
	const context = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(props) =>
				context.user ? (
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

export default PublicRoute;

/**
 * Base
 */
import { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

/**
 * Apollo
 */
import { useMutation } from "@apollo/client";
import { USER_AUTH } from "lib/graphql/user.queries";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectUser, userSignIn } from "store/auth.slice";
import { addNotification } from "store/app.slice";

/**
 * Utilities
 */
import jwtDecode, { JwtPayload } from "jwt-decode";
import { useQuery } from "lib/hooks/useQuery";
import { useTranslation } from "lib/hooks/useTranslation";
import { parseAuthData } from "lib/utils/auth.utils";

/**
 * Components
 */
import { Spinner } from "ui/misc/Spinner";

interface PublicRouteProps {
	[key: string]: any;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
	history,
	location,
	component: Component,
	...rest
}) => {
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const query = useQuery();
	const _t = useTranslation("notifications");

	useEffect(() => {
		const authToken = localStorage.getItem("auth-token");
		if (authToken) {
			const decoded: JwtPayload = jwtDecode(authToken);

			if (decoded.exp! * 1000 < Date.now()) {
				localStorage.removeItem("auth-token");
			} else {
				authUser();
				return;
			}
		}

		const provider = query.get("provider");
		const accessToken = query.get("access_token");

		if (provider && accessToken) {
			const variables = parseAuthData(provider, accessToken);
			const authenticate = async () => {
				await authUser({ variables: variables });
			};
			authenticate();
			return;
		}

		setLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	const [authUser] = useMutation(USER_AUTH, {
		onCompleted({ authUser }) {
			handleUserAuth(authUser);
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _t.error.title,
					text: `${_t.error.text} '${err}'`,
					type: "error",
				})
			);
		},
	});

	const handleUserAuth = (userData: any) => {
		dispatch(userSignIn(userData));
		setLoading(false);
	};

	return (
		<div
			className={`Page--${location.pathname.replaceAll("/", "") || "home"}`}
			style={{ height: "100vh" }}
		>
			{!loading ? (
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
			) : (
				<Spinner />
			)}
		</div>
	);
};

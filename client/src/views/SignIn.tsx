/**
 * Base
 */
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

/**
 * Redux
 */
import { useDispatch } from "react-redux";
import { userSignIn } from "store/auth.slice";

/**
 * Utilities
 */
import jwtDecode, { JwtPayload } from "jwt-decode";
import { USER_AUTH, USER_LOGIN } from "lib/graphql/user.queries";
import { parseLoginData } from "lib/parseLoginData";
import { useTranslation } from "lib/hooks/useTranslation";
import { useQuery } from "lib/hooks/useQuery";

/**
 * Components
 */
import { initialValues, validationSchema } from "lib/formik/SignIn.formik";
import { SignInTemplate } from "views/templates/SignIn.template";
import { addNotification } from "store/app.slice";

interface SignInProps {
	history: any;
	location: any;
}

export const SignIn: React.FC<SignInProps> = ({ history, location }) => {
	const _t = useTranslation("notifications");

	const dispatch = useDispatch();
	const query = useQuery();
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await loginUser({
				variables: { ...values, remember: Array.isArray(values.remember) },
			});
		},
	});

	useEffect(() => {
		if (localStorage.getItem("auth-token")) {
			const decoded: JwtPayload = jwtDecode(
				localStorage.getItem("auth-token")!
			);

			if (decoded.exp! * 1000 < Date.now()) {
				localStorage.removeItem("auth-token");
			} else {
				authUser();
			}
		}

		const provider = query.get("provider");
		const accessToken = query.get("access_token");

		if (provider && accessToken) {
			const variables = parseLoginData(provider, accessToken);
			const authenticate = async () => {
				await authUser({ variables: variables });
			};
			authenticate();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	const handleUserAuth = (userData: any) => {
		dispatch(userSignIn(userData));

		if (location.state && location.state?.from.pathname !== "logout") {
			history.push(location.state?.from.pathname);
		} else {
			history.push("/");
		}
	};

	const [loginUser] = useMutation(USER_LOGIN, {
		onCompleted({ loginUser }) {
			handleUserAuth(loginUser);
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _t.error.title,
					text: `${_t.error.text} '${err?.graphQLErrors[0]?.extensions?.exception?.errors}'`,
					type: "error",
				})
			);
		},
	});

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

	return <SignInTemplate formik={formik} />;
};

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
import { userLogin } from "store/auth.slice";

/**
 * Utilities
 */
import { USER_AUTH, USER_LOGIN } from "lib/graphql/user.queries";
import { useQuery } from "lib/hooks/useQuery";

/**
 * Components
 */
import { initialValues, validationSchema } from "./LogIn.lib/LogIn.formik";
import { parseData } from "./LogIn.lib/LogIn.parseData";
import { LogInTemplate } from "./LogIn.lib/LogIn.template";

interface LogInProps {
	history: any;
	location: any;
}

export const LogIn: React.FC<LogInProps> = ({ history, location }) => {
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
		const provider = query.get("provider");
		const accessToken = query.get("access_token");
		if (provider && accessToken) {
			const variables = parseData(provider, accessToken);
			const authenticate = async () => {
				await authUser({ variables: variables });
			};
			authenticate();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	const handleUserAuth = (userData: any) => {
		dispatch(userLogin(userData));

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
			console.log(err?.graphQLErrors[0]?.extensions?.exception?.errors);
		},
	});

	const [authUser] = useMutation(USER_AUTH, {
		onCompleted({ authUser }) {
			handleUserAuth(authUser);
		},
		onError(err) {
			console.log(err);
		},
	});

	return <LogInTemplate formik={formik} />;
};

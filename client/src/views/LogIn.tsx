import { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";

import { AuthContext } from "lib/AuthContext";
import { USER_AUTH, USER_LOGIN } from "lib/graphql/user.queries";
import { useQuery } from "lib/hooks/useQuery";

import { initialValues, validationSchema } from "./LogIn.lib/LogIn.formik";
import { LogInTemplate } from "./LogIn.lib/LogIn.template";
import { parseData } from "./LogIn.lib/LogIn.parseData";

interface LogInProps {
	history: any;
	location: any;
}

export const LogIn: React.FC<LogInProps> = ({ history, location }) => {
	const context = useContext(AuthContext);
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

	const handleUserAuth = async (userData: any) => {
		await context.loginUser(userData);

		// if (location.state && location.state?.from.pathname !== "logout") {
		// 	history.push(location.state?.from.pathname);
		// } else {
		// 	history.push("/");
		// }
	};

	const [loginUser] = useMutation(USER_LOGIN, {
		async onCompleted({ loginUser }) {
			await handleUserAuth(loginUser);
			console.log("loginUser");
		},
		onError(err) {
			console.log(err);
		},
	});

	const [authUser] = useMutation(USER_AUTH, {
		async onCompleted({ authUser }) {
			await handleUserAuth(authUser);
		},
		onError(err) {
			console.log(err);
		},
	});

	return <LogInTemplate formik={formik} />;
};

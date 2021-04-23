import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";

import { AuthContext } from "lib/AuthContext";
import { USER_LOGIN } from "lib/graphql/user.queries";
import { LogInTemplate } from "./LogIn.template";

interface LogInProps {
	history: any;
	location: any;
}

export const LogIn: React.FC<LogInProps> = ({ history, location }) => {
	const context = useContext(AuthContext);

	if (location.hash) {
		console.log(jwtDecode(location.hash.split("=")[1]));
	}

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			remember: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email()
				.required("Please enter a valid email address"),
			password: Yup.string().required("Please enter a password"),
			remember: Yup.array()
				.nullable()
				.of(
					Yup.object({
						name: Yup.string(),
						label: Yup.string(),
					})
				),
		}),
		onSubmit: async (values) => {
			await loginUser({
				variables: {
					email: values.email,
					password: values.password,
					remember: Array.isArray(values.remember),
				},
			});
		},
	});

	const [loginUser] = useMutation(USER_LOGIN, {
		onCompleted({ loginUser }) {
			context.loginUser(loginUser);

			if (location.state && location.state?.from.pathname !== "logout") {
				history.push(location.state?.from.pathname);
			} else {
				history.push("/");
			}
		},
		onError(err) {
			console.log(err);
		},
	});

	return <LogInTemplate formik={formik} />;
};

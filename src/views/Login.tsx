import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "lib/AuthContext";
import { USER_LOGIN } from "lib/graphql/user.queries";

import { Card, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Caption } from "ui/form/Caption";
import { Checkbox } from "ui/form/Checkbox";
import { Button } from "ui/misc/Button";

interface LoginProps {
	history: any;
	location: any;
}

export const Login: React.FC<LoginProps> = ({ history, location }) => {
	const context = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			remember: null,
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email()
				.required("Please enter a valid email address!"),
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

	return (
		<div className="container mx-auto min-h-screen flex justify-center items-center">
			<div className="w-96">
				<Card>
					<Header title="Log in" noSettings noClose />
					<form onSubmit={formik.handleSubmit}>
						<Text
							id="email"
							name="email"
							type="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errors={formik.errors.email}
							touched={formik.touched.email}
							label="Email"
						/>
						<Text
							id="password"
							name="password"
							type="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errors={formik.errors.password}
							touched={formik.touched.password}
							label="Password"
						/>
						<Checkbox
							options={[
								{
									name: "remember",
									label: "Remember me",
								},
							]}
							value={formik.values.remember}
							onChange={(value) => formik.setFieldValue("remember", value)}
							caption="Save login information?"
						/>
						<Button type="submit">Log in</Button>
					</form>
					<Caption className="mt-4">
						Don't have an account?{" "}
						<Link to="/register" className="text-app-accent-blue">
							Register
						</Link>
					</Caption>
				</Card>
			</div>
		</div>
	);
};

import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "lib/AuthContext";
import { USER_REGISTER } from "lib/graphql/user.queries";

import { Card, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Caption } from "ui/form/Caption";
import { Button } from "ui/misc/Button";

interface RegisterProps {
	history: any;
	location: any;
}

export const Register: React.FC<RegisterProps> = ({ history, location }) => {
	const context = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			repassword: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email()
				.required("Please enter a valid email address!"),
			password: Yup.string()
				.required("Please enter a password")
				.min(8, "Password too short, 8 characters minimum."),
			repassword: Yup.string()
				.required("Please re-type your password")
				.oneOf([Yup.ref("password"), null], "Passwords must match"),
		}),
		onSubmit: async (values) => {
			await createUser({
				variables: {
					email: values.email,
					password: values.password,
					repassword: values.repassword,
				},
			});
		},
	});

	const [createUser] = useMutation(USER_REGISTER, {
		onCompleted({ createUser }) {
			context.loginUser(createUser);

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
					<Header title="Register" noSettings noClose />
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
						<Text
							id="repassword"
							name="repassword"
							type="password"
							value={formik.values.repassword}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errors={formik.errors.repassword}
							touched={formik.touched.repassword}
							label="Re-type Password"
						/>
						<Button type="submit">Register</Button>
					</form>
					<Caption className="mt-4">
						Already have an account?{" "}
						<Link to="/login" className="text-app-accent-blue">
							Log in
						</Link>
					</Caption>
				</Card>
			</div>
		</div>
	);
};

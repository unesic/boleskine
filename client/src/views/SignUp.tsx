import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";

import { AuthContext } from "lib/AuthContext";
import { USER_SIGNUP } from "lib/graphql/user.queries";
import { SignUpTemplate } from "./SignUp.template";

interface SignUpProps {
	history: any;
	location: any;
}

export const SignUp: React.FC<SignUpProps> = ({ history, location }) => {
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

	const [createUser] = useMutation(USER_SIGNUP, {
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

	return <SignUpTemplate formik={formik} />;
};

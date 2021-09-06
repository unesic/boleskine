/**
 * Base
 */
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
import { USER_SIGNUP } from "lib/graphql/user.queries";

/**
 * Components
 */
import { initialValues, validationSchema } from "lib/formik/SignUp.formik";
import { SignUpTemplate } from "views/templates/SignUp.template";
import { addNotification } from "store/app.slice";

interface SignUpProps {
	history: any;
	location: any;
}

export const SignUp: React.FC<SignUpProps> = ({ history, location }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			await createUser({
				variables: {
					email: values.email,
					password: values.password,
					rePassword: values.rePassword,
				},
			});
		},
	});

	const [createUser] = useMutation(USER_SIGNUP, {
		onCompleted({ createUser }) {
			dispatch(userSignIn(createUser));

			if (location.state && location.state?.from.pathname !== "sign-out") {
				history.push(location.state?.from.pathname);
			} else {
				history.push("/");
			}
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: "There's been an error!",
					text: `Error: '${err?.graphQLErrors[0]?.extensions?.exception?.errors}'`,
					type: "error",
				})
			);
		},
	});

	return <SignUpTemplate formik={formik} />;
};

/**
 * Base
 */
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
import { USER_SIGNUP } from "lib/graphql/user.queries";

/**
 * Components
 */
import { initialValues, validationSchema } from "./SignUp.lib/SignUp.formik";
import { SignUpTemplate } from "./SignUp.lib/SignUp.template";

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
			dispatch(userLogin(createUser));

			if (location.state && location.state?.from.pathname !== "logout") {
				history.push(location.state?.from.pathname);
			} else {
				history.push("/");
			}
		},
		onError(err) {
			console.log(err?.graphQLErrors[0]?.extensions?.exception?.errors);
		},
	});

	return <SignUpTemplate formik={formik} />;
};

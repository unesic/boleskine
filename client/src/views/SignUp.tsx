/**
 * Base
 */
import { memo, useCallback, useState } from "react";
import { useMutation } from "@apollo/client";

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
import { SignUpTemplate, FormValues } from "views/templates/SignUp.template";

interface SignUpProps {
	history: any;
	location: any;
}

export const SignUp: React.FC<SignUpProps> = memo(({ history, location }) => {
	const [errors, setErrors] = useState<{ [key: string]: string }>();
	const dispatch = useDispatch();

	const onSubmit = useCallback(
		async (values: FormValues) => {
			await createUser({
				variables: {
					email: values.email,
					password: values.password,
					rePassword: values.rePassword,
				},
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const [createUser] = useMutation(USER_SIGNUP, {
		onCompleted({ createUser }) {
			dispatch(userSignIn(createUser));

			if (location.state && location.state?.from.pathname !== "sign-out") {
				history.push(location.state?.from.pathname);
			} else {
				history.push("/app");
			}
		},
		onError(err) {
			setErrors(err?.graphQLErrors[0]?.extensions?.exception?.errors);
		},
	});

	return <SignUpTemplate onSubmit={onSubmit} errors={errors} />;
});

export default SignUp;

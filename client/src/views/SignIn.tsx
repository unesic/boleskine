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
import { USER_LOGIN } from "lib/graphql/user.queries";

/**
 * Components
 */
import { SignInTemplate, FormValues } from "views/templates/SignIn.template";

interface SignInProps {
	history: any;
	location: any;
}

export const SignIn: React.FC<SignInProps> = memo(({ history, location }) => {
	const [errors, setErrors] = useState<{ [key: string]: string }>();
	const dispatch = useDispatch();

	const onSubmit = useCallback(async (values: FormValues) => {
		await loginUser({
			variables: { ...values, remember: Array.isArray(values.remember) },
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [loginUser] = useMutation(USER_LOGIN, {
		onCompleted({ loginUser }) {
			dispatch(userSignIn(loginUser));

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

	return <SignInTemplate onSubmit={onSubmit} errors={errors} />;
});

export default SignIn;

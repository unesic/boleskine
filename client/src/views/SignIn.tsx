/**
 * Base
 */
import { memo, useCallback } from "react";
import { useMutation } from "@apollo/client";

/**
 * Redux
 */
import { useDispatch } from "react-redux";
import { userSignIn } from "store/auth.slice";
import { addNotification } from "store/app.slice";

/**
 * Utilities
 */
import { USER_LOGIN } from "lib/graphql/user.queries";
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { SignInTemplate, FormValues } from "views/templates/SignIn.template";

interface SignInProps {
	history: any;
	location: any;
}

export const SignIn: React.FC<SignInProps> = memo(({ history, location }) => {
	const _t = useTranslation("notifications");
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
				history.push("/");
			}
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _t.error.title,
					text: `${_t.error.text} '${err?.graphQLErrors[0]?.extensions?.exception?.errors}'`,
					type: "error",
				})
			);
		},
	});

	return <SignInTemplate onSubmit={onSubmit} />;
});

export default SignIn;

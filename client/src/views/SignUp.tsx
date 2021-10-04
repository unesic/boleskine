/**
 * Base
 */
import { memo } from "react";
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
import { USER_SIGNUP } from "lib/graphql/user.queries";
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { SignUpTemplate, FormValues } from "views/templates/SignUp.template";

interface SignUpProps {
	history: any;
	location: any;
}

export const SignUp: React.FC<SignUpProps> = memo(({ history, location }) => {
	const _t = useTranslation("notifications");
	const dispatch = useDispatch();

	const onSubmit = async (values: FormValues) => {
		await createUser({
			variables: {
				email: values.email,
				password: values.password,
				rePassword: values.rePassword,
			},
		});
	};

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
					title: _t.error.title,
					text: `${_t.error.text} '${err?.graphQLErrors[0]?.extensions?.exception?.errors}'`,
					type: "error",
				})
			);
		},
	});

	return <SignUpTemplate onSubmit={onSubmit} />;
});

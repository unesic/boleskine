/**
 * Base
 */
import { memo, useEffect } from "react";

/**
 * Redux
 */
import { useDispatch } from "react-redux";
import { userSignOut } from "store/auth.slice";

interface SignOutProps {}

export const SignOut: React.FC<SignOutProps> = memo(() => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(userSignOut());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
});

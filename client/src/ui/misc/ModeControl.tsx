/**
 * Base
 */
import { useCallback } from "react";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, selectUser, setDarkMode } from "store/auth.slice";

/**
 * Utils
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { MenuItem, MenuItemLabel } from "ui/misc/MenuItem";
import { VscColorMode } from "react-icons/vsc";
import { useMutation } from "@apollo/client";
import { USER_UPDATE } from "lib/graphql/user.queries";

interface ModeControlProps {}

export const ModeControl: React.FC<ModeControlProps> = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const darkMode = useSelector(selectDarkMode);

	const _t = useTranslation("header");

	const [updateUser] = useMutation(USER_UPDATE, {
		onCompleted({ updateUser }) {
			console.log(updateUser);
		},
		onError(err) {
			console.log(err);
		},
	});

	const onClick = useCallback(() => {
		updateUser({ variables: { id: user!.id, darkMode: !darkMode } });
		dispatch(setDarkMode(!darkMode));
	}, [darkMode]);

	return (
		<MenuItem clickable={false}>
			<MenuItemLabel>
				<VscColorMode /> {_t.mode}
			</MenuItemLabel>
			<button className="ModeControl" onClick={onClick}></button>
		</MenuItem>
	);
};

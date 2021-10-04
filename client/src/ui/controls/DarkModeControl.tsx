/**
 * Base
 */
import { useCallback } from "react";

/**
 * Apollo
 */
import { useMutation } from "@apollo/client";
import { USER_UPDATE } from "lib/graphql/user.queries";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, selectUser, setDarkMode } from "store/auth.slice";
import { addNotification } from "store/app.slice";

/**
 * Utils
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { MenuItem } from "ui/misc/MenuItem";
import { MenuItemLabel } from "ui/misc/MenuItemLabel";
import { VscColorMode } from "react-icons/vsc";

interface DarkModeControlProps {}

export const DarkModeControl: React.FC<DarkModeControlProps> = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const darkMode = useSelector(selectDarkMode);

	const _t = useTranslation("header");
	const _tNot = useTranslation("notifications");

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
		dispatch(
			addNotification({
				id: new Date().toISOString(),
				title: _tNot.controls.mode.title,
				text: _tNot.controls.mode.text,
				type: "normal",
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_tNot, darkMode]);

	return (
		<MenuItem clickable={false}>
			<MenuItemLabel>
				<VscColorMode /> {_t.mode}
			</MenuItemLabel>
			<button className="ModeControl" onClick={onClick}></button>
		</MenuItem>
	);
};

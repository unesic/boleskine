/**
 * Base
 */
import { memo, useCallback } from "react";

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

export const DarkModeControl: React.FC<DarkModeControlProps> = memo(() => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const darkMode = useSelector(selectDarkMode);

	const _t = useTranslation("header");
	const _tNot = useTranslation("notifications");

	const [updateUser] = useMutation(USER_UPDATE, {
		onCompleted({ updateUser }) {
			dispatch(setDarkMode(updateUser.darkMode));
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.controls.mode.title,
					text: _tNot.controls.mode.text,
					type: "normal",
				})
			);
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.error.title,
					text: `${_tNot.error.text} '${err}'`,
					type: "error",
				})
			);
		},
	});

	const onClick = useCallback(() => {
		updateUser({ variables: { id: user!.id, darkMode: !darkMode } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [_tNot, darkMode, user]);

	return (
		<MenuItem clickable={false}>
			<MenuItemLabel>
				<VscColorMode /> {_t.mode}
			</MenuItemLabel>
			<button className="ModeControl" onClick={onClick}></button>
		</MenuItem>
	);
});

/**
 * Base
 */
import { useCallback, useMemo } from "react";

/**
 * Apollo
 */
import { useMutation } from "@apollo/client";
import { USER_UPDATE } from "lib/graphql/user.queries";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, selectUser, setLanguage } from "store/auth.slice";
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
import { Option, Select } from "ui/form/Select";
import { MdLanguage } from "react-icons/md";

interface LanguageControlProps {}

export const LanguageControl: React.FC<LanguageControlProps> = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const language = useSelector(selectLanguage);

	const _t = useTranslation("header");
	const _tLang = useTranslation("language");
	const _tNot = useTranslation("notifications");

	const [updateUser] = useMutation(USER_UPDATE, {
		onCompleted({ updateUser }) {
			dispatch(setLanguage(updateUser.language));
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.controls.lang.title,
					text: _tNot.controls.lang.text,
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

	const onChange = useCallback(
		(o: Option) => {
			updateUser({ variables: { id: user!.id, language: o.value } });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[_tNot, language]
	);

	const options = useMemo(
		() => [
			{ value: "en", label: "English" },
			{ value: "sr-Latn-RS", label: "Srpski" },
		],
		[]
	);

	return (
		<MenuItem clickable={false}>
			<MenuItemLabel>
				<MdLanguage /> {_t.language}
			</MenuItemLabel>
			<Select
				options={options}
				value={{ value: language ?? "en", label: _tLang }}
				onChange={(o) => onChange(o as Option)}
				onBlur={() => {}}
				errors={undefined}
				touched={false}
				isSearchable={false}
			/>
		</MenuItem>
	);
};

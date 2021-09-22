/**
 * Base
 */
import { useCallback, useMemo } from "react";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, selectUser, setLanguage } from "store/auth.slice";

/**
 * Utils
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { MenuItem, MenuItemLabel } from "ui/misc/MenuItem";
import { MdLanguage } from "react-icons/md";
import { Option, Select } from "ui/form/Select";
import { useMutation } from "@apollo/client";
import { USER_UPDATE } from "lib/graphql/user.queries";

interface LanguageControlProps {}

export const LanguageControl: React.FC<LanguageControlProps> = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const language = useSelector(selectLanguage);

	const _t = useTranslation("header");
	const _tLang = useTranslation("language");

	const [updateUser] = useMutation(USER_UPDATE, {
		onCompleted({ updateUser }) {
			console.log(updateUser);
		},
		onError(err) {
			console.log(err);
		},
	});

	const onChange = useCallback((o: Option) => {
		updateUser({ variables: { id: user!.id, language: o.value } });
		dispatch(setLanguage(o.value));
	}, []);

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

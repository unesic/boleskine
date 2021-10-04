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
import { selectCurrency, selectUser, setCurrency } from "store/auth.slice";
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
import { IoLogoEuro, IoLogoUsd } from "react-icons/io";

interface CurrencyControlProps {}

export const CurrencyControl: React.FC<CurrencyControlProps> = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const currency = useSelector(selectCurrency);

	const _t = useTranslation("header");
	const _tLang = useTranslation("language");
	const _tNot = useTranslation("notifications");

	const [updateUser] = useMutation(USER_UPDATE, {
		onCompleted({ updateUser }) {
			console.log(updateUser);
		},
		onError(err) {
			console.log(err);
		},
	});

	const onChange = useCallback(
		(o: Option) => {
			updateUser({ variables: { id: user!.id, currency: o.value } });
			dispatch(setCurrency(o.value));
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.controls.curr.title,
					text: `${_tNot.controls.curr.text} ${currency}`,
					type: "normal",
				})
			);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[_tNot, currency]
	);

	const options = useMemo(
		() => [
			{ value: "EUR", label: "EUR" },
			{ value: "RSD", label: "RSD" },
			{ value: "USD", label: "USD" },
		],
		[]
	);

	return (
		<MenuItem clickable={false}>
			<MenuItemLabel>
				{_tLang === "en" ? <IoLogoUsd /> : <IoLogoEuro />} {_t.currency}
			</MenuItemLabel>
			<Select
				options={options}
				value={{ value: currency ?? "EUR", label: currency ?? "EUR" }}
				onChange={(o) => onChange(o as Option)}
				onBlur={() => {}}
				errors={undefined}
				touched={false}
				isSearchable={false}
			/>
		</MenuItem>
	);
};

/**
 * Base
 */
import { useCallback, useMemo } from "react";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectCurrency, selectUser, setCurrency } from "store/auth.slice";

/**
 * Utils
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { IoLogoEuro, IoLogoUsd } from "react-icons/io";
import { Option, Select } from "ui/form/Select";
import { MenuItem, MenuItemLabel } from "ui/misc/MenuItem";
import { useMutation } from "@apollo/client";
import { USER_UPDATE } from "lib/graphql/user.queries";

interface CurrencyControlProps {}

export const CurrencyControl: React.FC<CurrencyControlProps> = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const currency = useSelector(selectCurrency);

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
		updateUser({ variables: { id: user!.id, currency: o.value } });
		dispatch(setCurrency(o.value));
	}, []);

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

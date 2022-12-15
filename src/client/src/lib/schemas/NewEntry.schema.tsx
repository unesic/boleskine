/**
 * Base
 */
import { useMemo } from "react";
import * as Yup from "yup";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";

export type EntryType = {
	value: string;
	label: string;
};

export type EntryInitialValues = {
	description: string;
	amount: string;
	type: EntryType | null;
};

export const useFormikSchema = () => {
	const _tApp = useTranslation("app");
	const _t = useTranslation("input_errors");

	const initialValues: EntryInitialValues = useMemo(
		() => ({
			description: "",
			amount: "",
			type: null,
		}),
		[]
	);

	const validationSchema = useMemo(
		() =>
			Yup.object({
				description: Yup.string()
					.max(100, _t.description.max)
					.required(_t.description.required),
				type: Yup.object({
					value: Yup.string(),
					label: Yup.string(),
				})
					.required(_t.type)
					.nullable(),
				amount: Yup.number().when("type", {
					is: (type: EntryType) =>
						type?.value === "inc" || type?.value === "exp",
					then: Yup.number()
						.positive(_t.amount.positive)
						.required(_t.amount.required),
				}),
			}),
		[_t]
	);

	const selectOptions = useMemo(
		() => [
			{ value: "inc", label: _tApp.new_entry.type.inc },
			{ value: "exp", label: _tApp.new_entry.type.exp },
			{ value: "not", label: _tApp.new_entry.type.not },
		],
		[_tApp]
	);

	return { initialValues, validationSchema, selectOptions };
};

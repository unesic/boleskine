/**
 * Base
 */
import { useMemo } from "react";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import * as Yup from "yup";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { Select } from "ui/form/Select";
import { Button } from "ui/misc/Button";
import { Text } from "ui/form/Text";

type EntryType = {
	value: string;
	label: string;
};

export type EntryInitialValues = {
	description: string;
	amount: string;
	type: EntryType | null;
};

const emptyInitialValues: EntryInitialValues = {
	description: "",
	amount: "",
	type: null,
};

export const useEntryForm = (
	onFormSubmit: (values: EntryInitialValues) => Promise<any>,
	withSubmit = false,
	initialValues = emptyInitialValues
): [
	form: JSX.Element,
	cb: () => Promise<any>,
	values: EntryInitialValues,
	errors: FormikErrors<EntryInitialValues>,
	touched: FormikTouched<EntryInitialValues>
] => {
	const _t = useTranslation("app");
	const selectOptions = useMemo(
		() => [
			{ value: "inc", label: _t.new_entry.type.inc },
			{ value: "exp", label: _t.new_entry.type.exp },
			{ value: "not", label: _t.new_entry.type.not },
		],
		[_t]
	);

	const validationSchema = Yup.object({
		description: Yup.string()
			.max(100, "Must be 100 characters or less")
			.required("Description is required"),
		type: Yup.object({
			value: Yup.string(),
			label: Yup.string(),
		})
			.required("Please select entry type")
			.nullable(),
		amount: Yup.number().when("type", {
			is: (type: EntryType) => type?.value === "inc" || type?.value === "exp",
			then: Yup.number()
				.positive("Amount must be a positive number")
				.required("Please enter an amount"),
		}),
	});

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values, { resetForm }) => {
			await onFormSubmit(values);
			resetForm();
		},
	});

	return [
		<form onSubmit={formik.handleSubmit}>
			<Text
				id="description"
				name="description"
				type="text"
				value={formik.values.description}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				errors={formik.errors.description}
				touched={formik.touched.description}
				label={_t.new_entry.desc}
			/>
			<Select
				options={selectOptions}
				value={formik.values.type}
				onChange={(value) => formik.setFieldValue("type", value)}
				onBlur={() => formik.setFieldTouched("type", true)}
				errors={formik.errors.type}
				touched={formik.touched.type}
				placeholder={_t.new_entry.type.placeholder}
			/>
			{formik.values.type?.value === "inc" ||
			formik.values.type?.value === "exp" ? (
				<Text
					id="amount"
					name="amount"
					type="number"
					step="any"
					value={formik.values.amount}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					errors={formik.errors.amount}
					touched={formik.touched.amount}
					label={_t.new_entry.amount}
				/>
			) : null}
			{withSubmit ? <Button type="submit">{_t.new_entry.btn}</Button> : null}
		</form>,
		formik.submitForm,
		formik.values,
		formik.errors,
		formik.touched,
	];
};

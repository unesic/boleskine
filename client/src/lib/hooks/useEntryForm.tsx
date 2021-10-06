/**
 * Base
 */
import { useMemo } from "react";
import { FormikErrors, FormikTouched, useFormik } from "formik";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";
import {
	useFormikSchema,
	EntryInitialValues,
} from "lib/schemas/NewEntry.schema";

/**
 * Components
 */
import { Select } from "ui/form/Select";
import { Button } from "ui/misc/Button";
import { Text } from "ui/form/Text";

export const useEntryForm = (
	onFormSubmit: (values: EntryInitialValues) => Promise<any>,
	withSubmit = false,
	values: EntryInitialValues | null = null
): [
	form: JSX.Element,
	cb: () => Promise<any>,
	values: EntryInitialValues,
	errors: FormikErrors<EntryInitialValues>,
	touched: FormikTouched<EntryInitialValues>
] => {
	const _t = useTranslation("app");
	const { initialValues, validationSchema, selectOptions } = useFormikSchema();

	const initialVals = useMemo(() => values || initialValues, [
		values,
		initialValues,
	]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: initialVals,
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

export type { EntryInitialValues };

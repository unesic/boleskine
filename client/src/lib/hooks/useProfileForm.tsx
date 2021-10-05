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
import { Button } from "ui/misc/Button";
import { Text } from "ui/form/Text";

type UserProfileSchema = {
	firstName: string;
	lastName: string;
	image: string;
};

export const useProfileForm = (
	onFormSubmit: (values: UserProfileSchema) => Promise<any>
): [
	form: JSX.Element,
	cb: () => Promise<any>,
	values: UserProfileSchema,
	errors: FormikErrors<UserProfileSchema>,
	touched: FormikTouched<UserProfileSchema>
] => {
	const _t = useTranslation("app");

	const initialValues = useMemo(
		() => ({
			firstName: "",
			lastName: "",
			image: "",
		}),
		[]
	);

	const validationSchema = useMemo(
		() =>
			Yup.object({
				firstName: Yup.string().max(50, "Must be 50 characters or less."),
				lastName: Yup.string().max(50, "Must be 50 characters or less."),
				image: Yup.string(),
			}),
		[]
	);

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
				id="firstName"
				name="firstName"
				type="text"
				value={formik.values.firstName}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				errors={formik.errors.firstName}
				touched={formik.touched.firstName}
				label={"First name"}
			/>
			<Text
				id="lastName"
				name="lastName"
				type="text"
				value={formik.values.lastName}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				errors={formik.errors.lastName}
				touched={formik.touched.lastName}
				label={"Last name"}
			/>
		</form>,
		formik.submitForm,
		formik.values,
		formik.errors,
		formik.touched,
	];
};

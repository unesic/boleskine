/**
 * Base
 */
import { useMemo } from "react";
import { FormikContextType, useFormik } from "formik";
import * as Yup from "yup";

/**
 * Components
 */
import { Text } from "ui/form/Text";
import { ImageUpload } from "ui/misc/ImageUpload";

type UserProfileSchema = {
	firstName: string;
	lastName: string;
	image: string;
};

export const useProfileForm = (
	onFormSubmit: (values: UserProfileSchema) => Promise<any>,
	setImageFile: React.Dispatch<React.SetStateAction<File | null>>,
	profileData: UserProfileSchema
): [form: JSX.Element, formik: FormikContextType<UserProfileSchema>] => {
	const initialValues = useMemo(() => ({ ...profileData }), [profileData]);

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
			<ImageUpload
				id="image"
				name="image"
				value={formik.values.image}
				accept="image/png, image/jpeg"
				onChange={(image) => setImageFile(image.file)}
				errors={formik.errors.image}
			/>
		</form>,
		formik,
	];
};

/**
 * Base
 */
import { useMemo } from "react";
import { FormikContextType, useFormik } from "formik";
import * as Yup from "yup";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { Text } from "ui/form/Text";
import { ImageUpload } from "ui/form/ImageUpload";
import { Avatar } from "ui/form/Avatar";

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
	const _t = useTranslation("input_errors");
	const _tProf = useTranslation("profile_update");

	const initialValues = useMemo(() => ({ ...profileData }), [profileData]);

	const validationSchema = useMemo(
		() =>
			Yup.object({
				firstName: Yup.string().max(50, _t.firstName),
				lastName: Yup.string().max(50, _t.lastName),
				image: Yup.string().url(_t.image),
			}),
		[_t]
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
				label={_tProf.firstName.label}
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
				label={_tProf.lastName.label}
			/>
			<Avatar
				id="image"
				name="image"
				value={formik.values.image}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				errors={formik.errors.image}
				touched={formik.touched.image}
				labelUrl={_tProf.image.label_url}
				labelOpt={_tProf.image.label_opt}
				spacer={_tProf.image.spacer}
				setValue={formik.setFieldValue}
			/>
			{process.env.NODE_ENV === "test" ? (
				<ImageUpload
					id="image"
					name="image"
					value={formik.values.image}
					accept="image/png, image/jpeg"
					onChange={(image) => setImageFile(image.file)}
					errors={formik.errors.image}
					label={_tProf.image.label}
					overlay={_tProf.image.overlay}
					instruction={_tProf.image.instruction}
					altText={`${formik.values.firstName}${_tProf.image.altText}`}
				/>
			) : null}
		</form>,
		formik,
	];
};

import * as Yup from "yup";

const initialValues = {
	email: "",
	password: "",
	remember: null,
};

const validationSchema = Yup.object({
	email: Yup.string().email().required("Please enter a valid email address"),
	password: Yup.string().required("Please enter a password"),
	remember: Yup.array()
		.nullable()
		.of(
			Yup.object({
				name: Yup.string(),
				label: Yup.string(),
			})
		),
});

export { initialValues, validationSchema };

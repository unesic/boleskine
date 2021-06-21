import * as Yup from "yup";

const initialValues = {
	email: "",
	password: "",
	rePassword: "",
};

const validationSchema = Yup.object({
	email: Yup.string().email().required("Please enter a valid email address!"),
	password: Yup.string()
		.required("Please enter a password")
		.min(8, "Password too short, 8 characters minimum."),
	rePassword: Yup.string()
		.required("Please re-type your password")
		.oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export { initialValues, validationSchema };

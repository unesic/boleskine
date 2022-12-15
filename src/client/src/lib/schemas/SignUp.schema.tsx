/**
 * Base
 */
import { useMemo } from "react";
import * as Yup from "yup";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";

export const useFormikSchema = () => {
	const _t = useTranslation("input_errors");

	const initialValues = useMemo(
		() => ({
			email: "",
			password: "",
			rePassword: "",
		}),
		[]
	);

	const validationSchema = useMemo(
		() =>
			Yup.object({
				email: Yup.string().email(_t.email.default).required(_t.email.required),
				password: Yup.string()
					.required(_t.password.required)
					.min(8, _t.password.min),
				rePassword: Yup.string()
					.required(_t.repassword.required)
					.oneOf([Yup.ref("password"), null], _t.repassword.matching),
			}),
		[_t]
	);

	return { initialValues, validationSchema };
};

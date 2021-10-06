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
			remember: null,
		}),
		[]
	);

	const validationSchema = useMemo(
		() =>
			Yup.object({
				email: Yup.string().email(_t.email.default).required(_t.email.required),
				password: Yup.string().required(_t.password),
				remember: Yup.array()
					.nullable()
					.of(
						Yup.object({
							name: Yup.string(),
							label: Yup.string(),
						})
					),
			}),
		[_t]
	);

	return { initialValues, validationSchema };
};

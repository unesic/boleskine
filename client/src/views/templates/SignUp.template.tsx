/**
 * Base
 */
import { memo } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";
import { useFormikSchema } from "lib/schemas/SignUp.schema";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Button } from "ui/misc/Button";
import { Spacer } from "ui/misc/Spacer";
import { Caption } from "ui/form/Caption";
import { SocialButtons } from "ui/misc/SocialButtons";

export interface FormValues {
	email: string;
	password: string;
	rePassword: string;
}

interface SignUpTemplateProps {
	onSubmit: (v: FormValues) => void;
}

export const SignUpTemplate: React.FC<SignUpTemplateProps> = memo(
	({ onSubmit }) => {
		const _t = useTranslation("sign_up");
		const { initialValues, validationSchema } = useFormikSchema();

		const formik = useFormik({
			initialValues: initialValues,
			validationSchema: validationSchema,
			onSubmit: onSubmit,
		});

		return (
			<div className="SignUp">
				<div className="SignUp__inner">
					<Card>
						<Header title={_t.card_title} />

						<div className="MainContent">
							<SocialButtons variant="sign_up" />

							<Spacer direction="vertical" withText={_t.spacer} />

							<div className="MainContent__Form">
								<Caption className="MainContent__Form__caption">
									{_t.form.title}
								</Caption>
								<form onSubmit={formik.handleSubmit}>
									<Text
										id="email"
										name="email"
										type="email"
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errors={formik.errors.email}
										touched={formik.touched.email}
										label={_t.form.email}
									/>
									<Text
										id="password"
										name="password"
										type="password"
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errors={formik.errors.password}
										touched={formik.touched.password}
										label={_t.form.pass}
									/>
									<Text
										id="rePassword"
										name="rePassword"
										type="password"
										value={formik.values.rePassword}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										errors={formik.errors.rePassword}
										touched={formik.touched.rePassword}
										label={_t.form.repass}
									/>
									<Button
										type="submit"
										disabled={!(formik.dirty && formik.isValid)}
									>
										{_t.form.btn}
									</Button>
								</form>
							</div>
						</div>
						<Caption className="HasAccount">
							{_t.has_acc.copy}{" "}
							<Link to="/sign-in" className="HasAccount__link">
								{_t.has_acc.link}
							</Link>
						</Caption>
					</Card>
				</div>
			</div>
		);
	}
);

/**
 * Base
 */
import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";
import { useWindowResize } from "lib/hooks/useWindowResize";
import { useFormikSchema } from "lib/schemas/SignIn.schema";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Button } from "ui/misc/Button";
import { Spacer } from "ui/misc/Spacer";
import { Caption } from "ui/form/Caption";
import { Checkbox } from "ui/form/Checkbox";
import { SocialButtons } from "ui/misc/SocialButtons";

export interface FormValues {
	email: string;
	password: string;
	remember: null;
}

interface SignInTemplateProps {
	onSubmit: (v: FormValues) => void;
	errors?: { [key: string]: string };
}

export const SignInTemplate: React.FC<SignInTemplateProps> = memo(
	({ onSubmit, errors }) => {
		const _t = useTranslation("sign_in");
		const [screenW] = useWindowResize();
		const { initialValues, validationSchema } = useFormikSchema();

		const formik = useFormik({
			initialValues: initialValues,
			validationSchema: validationSchema,
			onSubmit: onSubmit,
		});

		useEffect(() => {
			// console.log({
			// 	values: formik.values,
			// 	err: formik.errors,
			// 	touched: formik.touched,
			// 	errors,
			// });
		}, [formik.values, formik.errors, formik.touched, errors]);

		return (
			<div className="SignIn">
				<div className="SignIn__inner">
					<Card>
						<Header title={_t.card_title} />

						<div className="MainContent">
							<SocialButtons variant="sign_in" />

							<Spacer
								direction={screenW > 767 ? "vertical" : "horizontal"}
								withText={_t.spacer}
							/>

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
										errors={formik.errors.email || errors?.email}
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
										errors={formik.errors.password || errors?.password}
										touched={formik.touched.password}
										label={_t.form.pass}
									/>
									<Checkbox
										options={[
											{
												name: "remember",
												label: _t.form.save.label,
											},
										]}
										value={formik.values.remember}
										onChange={(value) =>
											formik.setFieldValue("remember", value)
										}
										caption={_t.form.save.caption}
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

						<Caption className="Account">
							{_t.no_acc.copy}{" "}
							<Link to="/sign-up" className="Account__link">
								{_t.no_acc.link}
							</Link>
						</Caption>
					</Card>
				</div>
			</div>
		);
	}
);

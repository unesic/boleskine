/**
 * Base
 */
import { Link } from "react-router-dom";
import { FormikProps } from "formik";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Caption } from "ui/form/Caption";
import { Button } from "ui/misc/Button";
import { Spacer } from "ui/misc/Spacer";
import { SocialButtons } from "ui/misc/SocialButtons";

interface Values {
	email: string;
	password: string;
	rePassword: string;
}

interface SignUpTemplateProps {
	formik: FormikProps<Values>;
}

export const SignUpTemplate: React.FC<SignUpTemplateProps> = ({
	formik: { values, errors, touched, handleSubmit, handleChange, handleBlur },
}) => {
	const _t = useTranslation("sign_up");

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
							<form onSubmit={handleSubmit}>
								<Text
									id="email"
									name="email"
									type="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									errors={errors.email}
									touched={touched.email}
									label={_t.form.email}
								/>
								<Text
									id="password"
									name="password"
									type="password"
									value={values.password}
									onChange={handleChange}
									onBlur={handleBlur}
									errors={errors.password}
									touched={touched.password}
									label={_t.form.pass}
								/>
								<Text
									id="rePassword"
									name="rePassword"
									type="password"
									value={values.rePassword}
									onChange={handleChange}
									onBlur={handleBlur}
									errors={errors.rePassword}
									touched={touched.rePassword}
									label={_t.form.repass}
								/>
								<Button type="submit">{_t.form.btn}</Button>
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
};

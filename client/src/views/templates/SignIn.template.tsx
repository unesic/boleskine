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
import { Checkbox } from "ui/form/Checkbox";
import { Button } from "ui/misc/Button";
import { Spacer } from "ui/misc/Spacer";
import { SocialButtons } from "ui/misc/SocialButtons";

interface Values {
	email: string;
	password: string;
	remember: null;
}

interface SignInTemplateProps {
	formik: FormikProps<Values>;
}

export const SignInTemplate: React.FC<SignInTemplateProps> = ({
	formik: {
		values,
		errors,
		touched,
		handleSubmit,
		handleChange,
		handleBlur,
		setFieldValue,
		dirty,
		isValid,
	},
}) => {
	const _t = useTranslation("sign_in");

	return (
		<div className="SignIn">
			<div className="SignIn__inner">
				<Card>
					<Header title={_t.card_title} />

					<div className="MainContent">
						<SocialButtons variant="sign_in" />

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
								<Checkbox
									options={[
										{
											name: "remember",
											label: _t.form.save.label,
										},
									]}
									value={values.remember}
									onChange={(value) => setFieldValue("remember", value)}
									caption={_t.form.save.caption}
								/>
								<Button type="submit" disabled={!dirty && !isValid}>
									{_t.form.btn}
								</Button>
							</form>
						</div>
					</div>

					<Caption className="NoAccount">
						{_t.no_acc.copy}{" "}
						<Link to="/sign-up" className="NoAccount__link">
							{_t.no_acc.link}
						</Link>
					</Caption>
				</Card>
			</div>
		</div>
	);
};

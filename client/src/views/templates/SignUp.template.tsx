/**
 * Base
 */
import { Link } from "react-router-dom";
import { FormikProps } from "formik";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Caption } from "ui/form/Caption";
import { Button } from "ui/misc/Button";
import { Spacer } from "ui/misc/Spacer";
import { SocialButtons } from "ui/misc/SocialButtons";
import { useTranslation } from "lib/hooks/useTranslation";

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
		<div className="container mx-auto min-h-screen flex justify-center items-center">
			<div className="min-w-min">
				<Card>
					<Header title={_t.card_title} />
					<div className="flex gap-8 px-2">
						<SocialButtons variant="sign_up" />
						<Spacer direction="vertical" withText={_t.spacer} />
						<div className="w-80">
							<Caption className="mb-4 text-lg text-center">
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
					<Caption className="mt-4 pb-2 text-center">
						{_t.has_acc.copy}{" "}
						<Link to="/sign-in" className="text-app-accent-blue">
							{_t.has_acc.link}
						</Link>
					</Caption>
				</Card>
			</div>
		</div>
	);
};
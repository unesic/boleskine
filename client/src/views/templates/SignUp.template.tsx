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
	return (
		<div className="container mx-auto min-h-screen flex justify-center items-center">
			<div className="min-w-min">
				<Card>
					<Header title="Sign up" />
					<div className="flex gap-8 px-2">
						<SocialButtons variant="signup" />
						<Spacer direction="vertical" withText="OR" />
						<div className="w-80">
							<Caption className="mb-4 text-lg text-center">
								Sign up with Email and Password
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
									label="Email"
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
									label="Password"
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
									label="Re-type Password"
								/>
								<Button type="submit">Sign up</Button>
							</form>
						</div>
					</div>
					<Caption className="mt-4 pb-2 text-center">
						Already have an account?{" "}
						<Link to="/login" className="text-app-accent-blue">
							Log in
						</Link>
					</Caption>
				</Card>
			</div>
		</div>
	);
};

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
import { Checkbox } from "ui/form/Checkbox";
import { Button } from "ui/misc/Button";
import { Spacer } from "ui/misc/Spacer";
import { SocialButtons } from "ui/misc/SocialButtons";

interface Values {
	email: string;
	password: string;
	remember: null;
}

interface LogInTemplateProps {
	formik: FormikProps<Values>;
}

export const LogInTemplate: React.FC<LogInTemplateProps> = ({
	formik: {
		values,
		errors,
		touched,
		handleSubmit,
		handleChange,
		handleBlur,
		setFieldValue,
	},
}) => {
	return (
		<div className="container mx-auto min-h-screen flex justify-center items-center">
			<div className="min-w-min">
				<Card>
					<Header title="Log in" noSettings noClose />
					<div className="flex gap-8 px-2">
						<SocialButtons variant="login" />
						<Spacer direction="vertical" withText="OR" />
						<div className="w-80">
							<Caption className="mb-4 text-lg text-center">
								Log in with Email and Password
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
								<Checkbox
									options={[
										{
											name: "remember",
											label: "Remember me",
										},
									]}
									value={values.remember}
									onChange={(value) => setFieldValue("remember", value)}
									caption="Save login information?"
								/>
								<Button type="submit">Log in</Button>
							</form>
						</div>
					</div>
					<Caption className="mt-4 pb-2 text-center">
						Don't have an account?{" "}
						<Link to="/signup" className="text-app-accent-blue">
							Sign up
						</Link>
					</Caption>
				</Card>
			</div>
		</div>
	);
};

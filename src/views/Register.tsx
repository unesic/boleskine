import React, { useState, useContext, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { AuthContext } from "lib/AuthContext";
import { USER_REGISTER } from "lib/graphql/user.queries";

import { InputText } from "ui/form/InputText";
import { Button } from "ui/misc/Button";
import Card, { Header } from "ui/card/Card";
import { Caption } from "ui/form/Caption";

interface RegisterProps {
	history: any;
	location: any;
}

export const Register: React.FC<RegisterProps> = ({ history, location }) => {
	const context = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	const [createUser] = useMutation(USER_REGISTER, {
		onCompleted({ createUser }) {
			context.loginUser(createUser);

			if (location.state && location.state?.from.pathname !== "logout") {
				history.push(location.state?.from.pathname);
			} else {
				history.push("/");
			}
		},
		onError(err) {
			console.log(err);
		},
	});

	const submitHandler = async (e: FormEvent) => {
		e.preventDefault();
		await createUser({
			variables: {
				email,
				password,
				rePassword,
			},
		});
	};

	return (
		<Card>
			<Header title="Register" />
			<form onSubmit={submitHandler} className="w-80">
				<InputText
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label="Email"
				/>
				<InputText
					type="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					label="Password"
				/>
				<InputText
					type="password"
					name="rePassword"
					value={rePassword}
					onChange={(e) => setRePassword(e.target.value)}
					label="Re-password"
				/>
				<Button>Register</Button>
			</form>
			<Caption className="mt-4">
				Already have an account?{" "}
				<Link to="/login" className="text-app-accent-blue">
					Log in
				</Link>
			</Caption>
		</Card>
	);
};

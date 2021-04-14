import React, { useState, useContext, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { AuthContext } from "lib/AuthContext";
import { USER_LOGIN } from "lib/graphql/user.queries";

import { InputText } from "ui/form/InputText";
import { InputCheckbox } from "ui/form/InputCheckbox";
import { Button } from "ui/misc/Button";
import Card, { Header, Title } from "ui/card/Card";
import { Caption } from "ui/form/Caption";

interface LoginProps {
	history: any;
	location: any;
}

export const Login: React.FC<LoginProps> = ({ history, location }) => {
	const context = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(false);

	const [loginUser] = useMutation(USER_LOGIN, {
		onCompleted({ loginUser }) {
			context.loginUser(loginUser);

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
		await loginUser({
			variables: {
				email,
				password,
				remember,
			},
		});
	};

	return (
		<Card>
			<Header>
				<Title>Log In</Title>
			</Header>
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
				<InputCheckbox
					options={[
						{
							name: "remember",
							checked: remember,
							label: "Remember me",
						},
					]}
					onChange={(e) => setRemember(e.target.checked)}
					caption="Save login information?"
				/>
				<Button>Log in</Button>
			</form>
			<Caption className="mt-4">
				Don't have an account?{" "}
				<Link to="/register" className="text-app-accent-blue">
					Register
				</Link>
			</Caption>
		</Card>
	);
};

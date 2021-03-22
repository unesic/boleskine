import { useMutation } from "@apollo/client";
import { AuthContext } from "lib/AuthContext";
import { USER_LOGIN } from "lib/graphql/user.queries";
import React, { useState, useContext, FormEvent } from "react";

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
		<div className="p-6 rounded-lg bg-gray-600 shadow-2xl">
			<form onSubmit={submitHandler} className="w-64">
				<fieldset className="flex flex-col mb-4">
					<label
						htmlFor="email"
						className="mb-2 text-lg font-semibold text-gray-100 icon"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="py-2 px-4 rounded"
					/>
				</fieldset>
				<fieldset className="flex flex-col mb-4">
					<label
						htmlFor="password"
						className="mb-2 text-lg font-semibold text-gray-100"
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="py-2 px-4 rounded"
					/>
				</fieldset>
				<fieldset className="flex flex-col mb-4">
					<label
						htmlFor="Remember"
						className="mb-2 text-lg font-semibold text-gray-100"
					>
						Remember
					</label>
					<input
						type="checkbox"
						name="remember"
						id="remember"
						checked={remember}
						onChange={(e) => setRemember(e.target.checked)}
						className="py-2 px-4 rounded"
					/>
				</fieldset>
				<input
					type="submit"
					value="Submit"
					className="py-2 px-4 rounded bg-teal-500 text-gray-100"
				/>
			</form>
		</div>
	);
};

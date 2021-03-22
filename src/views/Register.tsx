import { useMutation } from "@apollo/client";
import { AuthContext } from "lib/AuthContext";
import { USER_REGISTER } from "lib/graphql/user.queries";
import React, { useState, useContext, FormEvent } from "react";

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
		<div className="p-6 rounded-lg bg-gray-600 shadow-2xl">
			<form onSubmit={submitHandler} className="w-64">
				<fieldset className="flex flex-col mb-4">
					<label
						htmlFor="email"
						className="mb-2 text-lg font-semibold text-gray-100"
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
						htmlFor="rePassword"
						className="mb-2 text-lg font-semibold text-gray-100"
					>
						Re-password
					</label>
					<input
						type="password"
						name="rePassword"
						id="rePassword"
						value={rePassword}
						onChange={(e) => setRePassword(e.target.value)}
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

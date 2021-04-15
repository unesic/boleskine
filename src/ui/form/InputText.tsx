import React from "react";
import "assets/dist/components/Form.InputText.css";

interface InputTextProps {
	type: "text" | "email" | "password" | "number";
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
}

export const InputText: React.FC<InputTextProps> = ({
	type,
	name,
	value,
	onChange,
	label,
}) => {
	return (
		<div className="Field">
			<fieldset
				className={`Field--Text ${
					value !== "" ? "has-value" : ""
				}`.trim()}
			>
				<input
					type={type}
					name={name}
					id={name}
					value={value}
					onChange={onChange}
					className={`Field--Text__Input ${
						value !== "" ? "has-value" : ""
					}`.trim()}
					min={type === "number" ? 0 : undefined}
				/>
				<label htmlFor={name} className="Field--Text__Label">
					{label}
				</label>
			</fieldset>
		</div>
	);
};

import React from "react";

interface InputTextProps {
	type: string;
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
					value.trim() !== "" ? "has-value" : ""
				}`.trim()}
			>
				<input
					type={type}
					name={name}
					id={name}
					value={value}
					onChange={onChange}
					className={`Field--Text__Input ${
						value.trim() !== "" ? "has-value" : ""
					}`.trim()}
				/>
				<label htmlFor={name} className="Field--Text__Label">
					{label}
				</label>
			</fieldset>
		</div>
	);
};

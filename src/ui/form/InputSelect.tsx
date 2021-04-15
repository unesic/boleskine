import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";

import "assets/dist/components/Form.InputSelect.css";

interface InputSelectProps {
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	options: { title: string; val: string }[];
}

export const InputSelect: React.FC<InputSelectProps> = ({
	name,
	value,
	onChange,
	label,
	options,
}) => {
	const [state, setState] = useState({ title: "", val: "" });

	return (
		<div className="Field">
			<fieldset
				className={`Field--Select ${
					state.val.trim() !== "" ? "has-value" : ""
				}`.trim()}
			>
				<button className="Field--Select__Label">
					<span className="label">{label}</span>
					{state.val !== "" ? (
						<span className="value">{state.title}</span>
					) : null}{" "}
					<ChevronDownIcon width={24} />
				</button>
				<div className="Field--Select__Options">
					{options.map(({ title, val }) => (
						<button
							key={val}
							className={`Field--Select__Option ${
								val === state.val ? "selected" : ""
							}`.trim()}
							onClick={() => setState({ title, val })}
						>
							{title}
						</button>
					))}
				</div>
				<input
					type="hidden"
					name={name}
					id={name}
					value={state.val}
					onChange={onChange}
				/>
			</fieldset>
		</div>
	);
};

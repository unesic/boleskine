import { Caption } from "./Caption";

import "assets/dist/components/Form.InputCheckbox.css";

interface InputCheckboxProps {
	options: { name: string; checked: boolean; label: string }[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	caption?: string;
}

export const InputCheckbox: React.FC<InputCheckboxProps> = ({
	options,
	onChange,
	caption = null,
}) => {
	return (
		<div className="Field">
			<fieldset className="Field--Checkbox">
				{caption ? <Caption>{caption}</Caption> : null}
				<div className="Field--Checkbox__Options">
					{options.map(({ name, checked, label }) => (
						<div
							key={name}
							className={`Field--Checkbox__Option ${
								checked ? "checked" : ""
							}`.trim()}
						>
							<input
								type="checkbox"
								name={name}
								id={name}
								checked={checked}
								onChange={onChange}
								className="Field--Checkbox__Input"
							/>
							<label htmlFor={name} className="Field--Checkbox__Label">
								{label}
							</label>
						</div>
					))}
				</div>
			</fieldset>
		</div>
	);
};

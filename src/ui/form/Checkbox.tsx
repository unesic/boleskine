import { useEffect, useState } from "react";

import "assets/dist/components/Form.Checkbox.css";
import { Caption } from "./Caption";

type Option = {
	name: string;
	label: string;
};

interface CheckboxProps {
	options: Option[];
	value: Option[] | null;
	onChange: (e: Option[] | null) => void;
	caption?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
	options,
	value,
	onChange,
	caption = null,
}) => {
	const [selected, setSelected] = useState<Option[] | null>(null);
	const [isFocused, setIsFocused] = useState<string | null>(null);

	useEffect(() => {
		setSelected(value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onChange(selected);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	const onChangeHandler = (option: Option) => {
		if (!selected) setSelected([option]);
		else {
			const newSelected = [...selected];
			const exists = newSelected.find((o) => o.name === option.name);
			const filtered = newSelected.filter(({ name }) => name !== option.name);
			setSelected(
				exists ? (filtered.length ? filtered : null) : [...selected, option]
			);
		}
	};

	return (
		<div className="Field">
			<fieldset className="Field--Checkbox">
				{caption ? <Caption>{caption}</Caption> : null}
				<div className="Field--Checkbox__Options">
					{options.map(({ name, label }) => {
						const checked = selected?.find?.((o) => o.name === name)
							? true
							: false;
						return (
							<label
								key={name}
								htmlFor={name}
								className={`Field--Checkbox__Option ${
									checked ? "Field--Checkbox__Option--checked" : ""
								} ${
									isFocused === name ? "Field--Checkbox__Option--focus" : ""
								}`.trim()}
							>
								<input
									type="checkbox"
									name={name}
									id={name}
									checked={checked}
									onChange={() => onChangeHandler({ name, label })}
									className="Field--Checkbox__input"
									onFocus={() => setIsFocused(name)}
									onBlur={() => setIsFocused(null)}
								/>
								{label}
							</label>
						);
					})}
				</div>
			</fieldset>
		</div>
	);
};

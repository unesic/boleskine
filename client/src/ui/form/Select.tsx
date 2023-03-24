/**
 * Base
 */
import { memo } from "react";
import ReactSelect, { MultiValue } from "react-select";

/**
 * Components
 */
import { Error } from "ui/form/Error";

export type Option = {
	value: string;
	label: string;
};

interface SelectProps {
	options: Option[];
	value: Option | Option[] | null;
	onChange: (o: Option | MultiValue<Option> | null) => void;
	onBlur?: () => void;
	errors?: string | undefined;
	touched?: boolean | undefined;
	placeholder?: string | null;
	isMulti?: boolean;
	isSearchable?: boolean;
	menuIsOpen?: boolean;
}

export const Select: React.FC<SelectProps> = memo(
	({
		options,
		value,
		onChange,
		onBlur,
		errors,
		touched,
		placeholder = "",
		isMulti = false,
		isSearchable = true,
		menuIsOpen,
	}) => {
		return (
			<div className="Field">
				<fieldset className="Field--Select">
					<ReactSelect
						value={value}
						options={options}
						onChange={onChange}
						onBlur={onBlur}
						placeholder={placeholder}
						className={`Field--Select ${
							touched && errors ? "Field--Select--has-errors" : ""
						}`.trim()}
						classNamePrefix="Field--Select"
						isMulti={isMulti}
						isSearchable={isSearchable}
						menuIsOpen={menuIsOpen}
					/>
				</fieldset>
				{touched && errors ? <Error>{errors}</Error> : null}
			</div>
		);
	}
);

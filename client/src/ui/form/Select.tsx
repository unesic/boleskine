/**
 * Base
 */
import ReactSelect, { OptionsType } from "react-select";

/**
 * Components
 */
import { Error } from "./Error";

export type Option = {
	value: string;
	label: string;
};

interface SelectProps {
	options: Option[];
	value: Option | Option[] | null;
	onChange: (o: Option | OptionsType<Option> | null) => void;
	onBlur: () => void;
	errors: string | undefined;
	touched: boolean | undefined;
	placeholder?: string | null;
	isMulti?: boolean;
	isSearchable?: boolean;
}

export const Select: React.FC<SelectProps> = ({
	options,
	value,
	onChange,
	onBlur,
	errors,
	touched,
	placeholder = "Select...",
	isMulti = false,
	isSearchable = true,
}) => {
	return (
		<div className="Field">
			<fieldset className="Field--Select--fs">
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
				/>
			</fieldset>
			{touched && errors ? <Error>{errors}</Error> : null}
		</div>
	);
};

import TextareaAutosize from "react-textarea-autosize";

import "assets/dist/components/Form.Textarea.css";
import { Error } from "./Error";

interface TextareaProps {
	id: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<any>) => void;
	onBlur: (e: React.FocusEvent<any>) => void;
	errors: string | undefined;
	touched: boolean | undefined;
	label: string;
	minRows?: number;
	maxRows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
	errors,
	touched,
	label,
	minRows = 1,
	maxRows = 3,
	...props
}) => {
	return (
		<div className="Field">
			<fieldset
				className={`Field--Textarea ${
					props.value !== "" ? "Field--Textarea--has-value" : ""
				} ${touched && errors ? "Field--Textarea--has-errors" : ""}`.trim()}
			>
				<TextareaAutosize
					{...props}
					minRows={minRows}
					maxRows={maxRows}
					className={`Field--Textarea__input ${
						props.value !== "" ? "Field--Textarea__input--has-value" : ""
					}`.trim()}
				/>
				<label htmlFor={props.name} className="Field--Textarea__label">
					{label}
				</label>
			</fieldset>
			{touched && errors ? <Error>{errors}</Error> : null}
		</div>
	);
};

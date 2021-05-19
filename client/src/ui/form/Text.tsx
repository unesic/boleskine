/**
 * Components
 */
import { Error } from "./Error";

interface TextProps {
	id: string;
	name: string;
	type: "text" | "email" | "password" | "number";
	step?: string;
	value: any;
	onChange: (e: React.ChangeEvent<any>) => void;
	onBlur: (e: React.FocusEvent<any>) => void;
	errors: string | undefined;
	touched: boolean | undefined;
	label: string;
}

export const Text: React.FC<TextProps> = ({
	errors,
	touched,
	label,
	...props
}) => {
	return (
		<div className="Field">
			<fieldset
				className={`Field--Text ${
					props.value !== "" ? "Field--Text--has-value" : ""
				} ${touched && errors ? "Field--Text--has-errors" : ""}`.trim()}
			>
				<input
					{...props}
					className={`Field--Text__input ${
						props.value !== "" ? "Field--Text__input--has-value" : ""
					}`.trim()}
				/>
				<label htmlFor={props.name} className="Field--Text__label">
					{label}
				</label>
			</fieldset>
			{touched && errors ? <Error>{errors}</Error> : null}
		</div>
	);
};

/**
 * Base
 */
import { useMemo, memo } from "react";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

/**
 * Components
 */
import { Error } from "./Error";
import { Spacer } from "ui/misc/Spacer";

interface AvatarProps {
	id: string;
	name: string;
	value: string;
	onChange: (e: React.ChangeEvent<any>) => void;
	onBlur: (e: React.FocusEvent<any>) => void;
	errors: string | undefined;
	touched: boolean | undefined;
	labelUrl: string;
	labelOpt: string;
	spacer: string;
	setValue: (field: string, value: any, shouldValidate?: boolean) => void;
}

export const Avatar: React.FC<AvatarProps> = memo(
	({
		id,
		name,
		value,
		onChange,
		onBlur,
		errors,
		touched,
		labelUrl,
		labelOpt,
		spacer,
		setValue,
	}) => {
		const user = useSelector(selectUser);
		const avatars = useMemo(
			() => [
				{
					type: "initials",
					seed: `${user.firstName}-${user.lastName}`,
					src: `https://avatars.dicebear.com/api/initials/${user.firstName}-${user.lastName}.svg?size=100`,
					valid: user.firstName || user.lastName,
				},
				{
					type: "identicon",
					seed: user.id,
					src: `https://avatars.dicebear.com/api/identicon/${user.id}.svg?size=100`,
					valid: user.id,
				},
				{
					type: "jdenticon",
					seed: user.id,
					src: `https://avatars.dicebear.com/api/jdenticon/${user.id}.svg?size=100`,
					valid: user.id,
				},
				{
					type: "gridy",
					seed: user.id,
					src: `https://avatars.dicebear.com/api/gridy/${user.id}.svg?size=100`,
					valid: user.id,
				},
			],
			[user]
		);

		return (
			<div className="Field">
				<fieldset
					className={`Field--Avatar ${
						value !== "" ? "Field--Avatar--has-value" : ""
					} ${touched && errors ? "Field--Avatar--has-errors" : ""}`.trim()}
				>
					<input
						id={id}
						name={name}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						className={`Field--Avatar__input ${
							value !== "" ? "Field--Avatar__input--has-value" : ""
						}`.trim()}
					/>
					<label htmlFor={name} className="Field--Avatar__label">
						{labelUrl}
					</label>
				</fieldset>
				{touched && errors ? <Error>{errors}</Error> : null}

				<Spacer direction="horizontal" withText={spacer} />

				<div className="Field--Avatar__options">
					<label htmlFor={name} className="Field--Avatar__label">
						{labelOpt}
					</label>
					{avatars.map(({ type, seed, src, valid }) =>
						valid ? (
							<button
								key={`${type}-${seed}`}
								type="button"
								onClick={() => setValue(name, src)}
								className={`AvatarOption ${
									value === src ? "AvatarOption--selected" : ""
								}`}
							>
								<img src={src} alt={`${type}-${seed}`} />
							</button>
						) : null
					)}
				</div>
			</div>
		);
	}
);

interface ButtonProps {
	type?: "button" | "submit";
	variant?: "primary" | "secondary";
	className?: string;
	disabled?: boolean;
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	type = "button",
	variant = "primary",
	className = "",
	disabled = false,
	onClick = () => {},
	children,
}) => {
	return (
		<button
			className={`Button Button--${variant} ${className}`.trim()}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

interface ButtonProps {
	type?: "button" | "submit";
	variant?: "primary" | "secondary";
	className?: string;
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	type = "button",
	variant = "primary",
	onClick = () => {},
	className = "",
	children,
}) => {
	return (
		<button
			className={`Button Button--${variant} ${className}`.trim()}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

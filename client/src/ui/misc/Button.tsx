interface ButtonProps {
	type?: "button" | "submit";
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	type = "button",
	onClick = () => {},
	children,
}) => {
	return (
		<button className="Button" type={type} onClick={onClick}>
			{children}
		</button>
	);
};

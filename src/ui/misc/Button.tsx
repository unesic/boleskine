import React from "react";

interface ButtonProps {
	onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
	onClick = () => {},
	children,
}) => {
	return (
		<button className="Button" onClick={onClick}>
			{children}
		</button>
	);
};

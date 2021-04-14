import React from "react";

interface CaptionProps {
	className?: string;
}

export const Caption: React.FC<CaptionProps> = ({
	className = "",
	children,
}) => {
	return <p className={`Field__Caption ${className}`.trim()}>{children}</p>;
};

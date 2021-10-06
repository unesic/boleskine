import { memo } from "react";

interface CardProps {
	isDragging?: boolean;
	className?: string;
}

export const Card: React.FC<CardProps> = memo(
	({ isDragging = false, className = "", children }) => {
		return (
			<div className={`Card ${className} ${isDragging ? "drag" : ""}`.trim()}>
				{children}
			</div>
		);
	}
);

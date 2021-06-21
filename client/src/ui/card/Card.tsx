interface CardProps {
	isDragging?: boolean;
}

export const Card: React.FC<CardProps> = ({ isDragging = false, children }) => {
	return (
		<div className={`Card ${isDragging ? "drag" : ""}`.trim()}>{children}</div>
	);
};

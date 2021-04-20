import {
	Draggable,
	DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { Card } from "./Card";

interface DraggableCardProps {
	draggableId: string;
	index: number;
	className?: string;
	children: (
		dragHandleProps: DraggableProvidedDragHandleProps | undefined
	) => JSX.Element;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
	draggableId,
	index,
	className = "",
	children,
}) => {
	return (
		<Draggable draggableId={draggableId} index={index}>
			{({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
				<div ref={innerRef} {...draggableProps} className={className}>
					<Card isDragging={isDragging}>{children(dragHandleProps)}</Card>
				</div>
			)}
		</Draggable>
	);
};

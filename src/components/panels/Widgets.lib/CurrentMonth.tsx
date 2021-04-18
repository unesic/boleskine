import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Card, { Header } from "ui/card/Card";
import { Totals } from "./Totals";

interface CurrentMonthProps {
	id: string;
	idx: number;
}

export const CurrentMonth: React.FC<CurrentMonthProps> = ({ id, idx }) => {
	return (
		<Draggable draggableId={id} index={idx}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Card>
						<Header
							title="Current month"
							yMove
							dragHandleY={provided.dragHandleProps}
						/>
						<Totals
							date={[new Date().toISOString()]}
							income={69420}
							expense={42069.96}
						/>
					</Card>
				</div>
			)}
		</Draggable>
	);
};

import React from "react";
import { Draggable } from "react-beautiful-dnd";

import "assets/dist/components/Tracking.css";
import Card, { Header } from "ui/card/Card";
import { Day, DayType } from "./Days.lib/Day";

export type TrackingType = DayType[];

interface TrackingProps {
	id: string;
	idx: number;
	days: TrackingType;
	active: string;
}

export const Tracking: React.FC<TrackingProps> = ({
	id,
	idx,
	days,
	active,
}) => {
	return (
		<Draggable draggableId={id} index={idx}>
			{({ innerRef, draggableProps, dragHandleProps }) => (
				<div
					ref={innerRef}
					{...draggableProps}
					className="col-span-5 relative px-2 h-full"
				>
					<Card>
						<Header
							title="Expense and income"
							xMove
							dragHandleX={dragHandleProps}
						/>
						<div className="Tracking">
							{days.map((day) => (
								<Day key={day.id} {...day} dropDisabled={day.id !== active} />
							))}
						</div>
					</Card>
				</div>
			)}
		</Draggable>
	);
};

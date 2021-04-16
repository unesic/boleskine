import React from "react";
import { Droppable } from "react-beautiful-dnd";

import { Calendar } from "./widgets/Calendar";
import { CurrentMonth } from "./widgets/CurrentMonth";
import { CurrentWeek } from "./widgets/CurrentWeek";

interface WidgetsProps {
	order: string[];
}

export const Widgets: React.FC<WidgetsProps> = ({ order }) => {
	return (
		<Droppable droppableId="WIDGETS" type="WIDGETS">
			{(provided) => (
				<div ref={provided.innerRef} className="flex flex-col gap-4">
					{order.map((widget, idx) =>
						widget === "calendar" ? (
							<Calendar key={widget} id={widget} idx={idx} />
						) : widget === "week" ? (
							<CurrentWeek key={widget} id={widget} idx={idx} />
						) : widget === "month" ? (
							<CurrentMonth key={widget} id={widget} idx={idx} />
						) : null
					)}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

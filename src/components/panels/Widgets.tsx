import { Draggable, Droppable } from "react-beautiful-dnd";

import { Calendar } from "./Widgets.lib/Calendar";
import { CurrentWeek as Week } from "./Widgets.lib/CurrentWeek";
import { CurrentMonth as Month } from "./Widgets.lib/CurrentMonth";

interface WidgetsProps {
	id: string;
	idx: number;
	order: string[];
}

export const Widgets: React.FC<WidgetsProps> = ({ id, idx, order }) => {
	return (
		<Draggable draggableId={id} index={idx}>
			{({ innerRef, draggableProps, dragHandleProps }) => (
				<div
					ref={innerRef}
					{...draggableProps}
					{...dragHandleProps}
					className="col-span-3"
				>
					<Droppable droppableId="WIDGETS" type="WIDGETS">
						{({ innerRef, placeholder }) => (
							<div ref={innerRef} className="flex flex-col gap-4 px-2">
								{order.map((id, idx) =>
									id === "calendar" ? (
										<Calendar key={id} id={id} idx={idx} />
									) : id === "week" ? (
										<Week key={id} id={id} idx={idx} />
									) : id === "month" ? (
										<Month key={id} id={id} idx={idx} />
									) : null
								)}
								{placeholder}
							</div>
						)}
					</Droppable>
				</div>
			)}
		</Draggable>
	);
};

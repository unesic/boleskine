/**
 * Base
 */
import { memo, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	selectActiveMonthDays,
	updateActiveMonthDays,
} from "store/tracking.slice";

/**
 * Utilities & types
 */
import { reorder, reorderDays } from "lib/reorder";
import type { DayType } from "lib/SharedTypes";

/**
 * Components
 */
import { Widgets } from "components/pannels/Widgets";
import { NewEntry } from "components/pannels/NewEntry";
import { Tracking } from "components/pannels/Tracking";

interface HomeProps {}

export const Home: React.FC<HomeProps> = memo(() => {
	const [pannels, setPannels] = useState(["widgets", "tracking", "newEntry"]);
	const [widgets, setWidgets] = useState(["calendar", "week", "month"]);

	const dispatch = useDispatch();
	const activeMonthDays = useSelector(selectActiveMonthDays);

	const onDragEndHandler = (result: DropResult) => {
		const { type } = result;
		if (type.includes("ENTRIES")) {
			reorderDays(result, activeMonthDays, (newDays: DayType[]) =>
				dispatch(updateActiveMonthDays(newDays))
			);
		} else if (type === "WIDGETS") {
			reorder(result, widgets, setWidgets);
		} else if (type === "PANNELS") {
			reorder(result, pannels, setPannels);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEndHandler}>
			<Droppable droppableId="PANNELS" type="PANNELS" direction="horizontal">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="grid grid-cols-12 h-full"
					>
						{pannels.map((id, idx) =>
							id === "widgets" ? (
								<Widgets key={id} id={id} idx={idx} order={widgets} />
							) : id === "tracking" ? (
								<Tracking key={id} id={id} idx={idx} days={activeMonthDays} />
							) : id === "newEntry" ? (
								<NewEntry key={id} id={id} idx={idx} />
							) : null
						)}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
});

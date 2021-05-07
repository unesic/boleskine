/**
 * Base
 */
import { memo, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { updateActiveMonth, selectActiveMonth } from "store/tracking.slice";

/**
 * Utilities & types
 */
import { reorder, reorderDays } from "lib/reorder";
import { DayType } from "lib/SharedTypes";

/**
 * Components
 */
import { Sidebar } from "components/Sidebar";
import { Widgets } from "components/pannels/Widgets";
import { NewEntry } from "components/pannels/NewEntry";
import { Tracking } from "components/pannels/Tracking";

interface HomeProps {}

export const Home: React.FC<HomeProps> = memo(() => {
	const [pannels, setPannels] = useState(["widgets", "tracking", "newEntry"]);
	const [widgets, setWidgets] = useState(["calendar", "week", "month"]);
	const activeMonth = useSelector(selectActiveMonth);
	const dispatch = useDispatch();

	const onDragEndHandler = (result: DropResult) => {
		const { type } = result;
		if (type.includes("ENTRIES")) {
			reorderDays(result, activeMonth, (newDays: DayType[]) =>
				dispatch(updateActiveMonth(newDays))
			);
		} else if (type === "WIDGETS") {
			reorder(result, widgets, setWidgets);
		} else if (type === "PANNELS") {
			reorder(result, pannels, setPannels);
		}
	};

	return (
		<div className="grid grid-cols-12 py-8 2xl:px-0 px-4 2xl:container 2xl:mx-auto">
			<Sidebar />
			<main className="col-span-10 relative">
				<DragDropContext onDragEnd={onDragEndHandler}>
					<Droppable
						droppableId="PANNELS"
						type="PANNELS"
						direction="horizontal"
					>
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
										<Tracking key={id} id={id} idx={idx} days={activeMonth} />
									) : id === "newEntry" ? (
										<NewEntry key={id} id={id} idx={idx} />
									) : null
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</main>
		</div>
	);
});

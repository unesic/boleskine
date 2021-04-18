import React, { Dispatch, SetStateAction, useState } from "react";
import {
	DragDropContext,
	DragStart,
	Droppable,
	DropResult,
} from "react-beautiful-dnd";

import { Sidebar } from "components/Sidebar";
import { Widgets } from "components/panels/Widgets";
import { Tracking } from "components/panels/Tracking";
import { NewEntry } from "components/panels/NewEntry";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
	const [pannels, setPannels] = useState(["widgets", "tracking", "newEntry"]);
	const [widgets, setWidgets] = useState(["calendar", "week", "month"]);
	const [activeDayId, setActiveDayId] = useState("");

	const onDragStartHandler = (initial: DragStart) => {
		setActiveDayId(initial.source.droppableId);
	};

	const onDragEndHandler = (result: DropResult) => {
		const { type } = result;
		if (type === "WIDGETS") reorder(result, widgets, setWidgets);
		else if (type === "PANNELS") reorder(result, pannels, setPannels);
		else console.log(result);
	};

	const reorder = (
		{ source, destination }: DropResult,
		oldOrder: string[],
		cbFn: Dispatch<SetStateAction<string[]>>
	) => {
		const newOrder = [...oldOrder];
		const [moved] = newOrder.splice(source.index, 1);
		newOrder.splice(destination!.index, 0, moved);
		cbFn(newOrder);
	};

	return (
		<div className="grid grid-cols-12 py-8 2xl:px-0 px-4 2xl:container 2xl:mx-auto">
			<Sidebar />
			<main className="col-span-10">
				<DragDropContext
					onDragEnd={onDragEndHandler}
					onDragStart={onDragStartHandler}
				>
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
										<Tracking key={id} id={id} idx={idx} active={activeDayId} />
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
};

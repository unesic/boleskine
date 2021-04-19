import React, { Dispatch, SetStateAction, useState } from "react";
import {
	DragDropContext,
	DragStart,
	Droppable,
	DropResult,
} from "react-beautiful-dnd";

import dummyDays from "./dummyDays";

import { Sidebar } from "components/Sidebar";
import { Widgets } from "components/panels/Widgets";
import { Tracking } from "components/panels/Tracking";
import { NewEntry } from "components/panels/NewEntry";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
	const [pannels, setPannels] = useState(["widgets", "tracking", "newEntry"]);
	const [widgets, setWidgets] = useState(["calendar", "week", "month"]);
	const [activeDayId, setActiveDayId] = useState("");
	const [days, setDays] = useState(dummyDays);

	const onDragStartHandler = (initial: DragStart) => {
		setActiveDayId(initial.source.droppableId);
	};

	const onDragEndHandler = (result: DropResult) => {
		const { type } = result;
		if (type === "WIDGETS") reorder(result, widgets, setWidgets);
		else if (type === "PANNELS") reorder(result, pannels, setPannels);
		else if (type === "ENTRIES") reorder2(result);
	};

	const reorder = (
		{ source, destination }: DropResult,
		oldOrder: string[],
		cbFn: Dispatch<SetStateAction<string[]>>
	) => {
		if (!destination) return;

		const newOrder = [...oldOrder];
		const [moved] = newOrder.splice(source.index, 1);
		newOrder.splice(destination.index, 0, moved);
		cbFn(newOrder);
	};

	const reorder2 = ({ source, destination }: DropResult) => {
		if (!destination) return;

		const newDays = [...days];
		const day = newDays.find(({ id }) => id === source.droppableId);
		if (!day) return;
		const dayIdx = days.findIndex(({ id }) => id === day.id);

		const newEntries = [...day.entries];
		const [moved] = newEntries.splice(source.index, 1);
		newEntries.splice(destination.index, 0, moved);
		day.entries = [...newEntries];

		newDays.splice(dayIdx, 1, day);
		setDays(newDays);
		setActiveDayId("");
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
										<Tracking
											key={id}
											id={id}
											idx={idx}
											days={days}
											active={activeDayId}
										/>
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

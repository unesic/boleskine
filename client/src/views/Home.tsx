import { useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import jwtDecode from "jwt-decode";

import dummyDays from "./dummyDays";

import { Sidebar } from "components/Sidebar";
import { Widgets } from "components/pannels/Widgets";
import { Tracking } from "components/pannels/Tracking";
import { NewEntry } from "components/pannels/NewEntry";
import { reorder, reorderDays } from "lib/reorder";

interface HomeProps {
	location: any;
}

export const Home: React.FC<HomeProps> = ({ location }) => {
	const [pannels, setPannels] = useState(["widgets", "tracking", "newEntry"]);
	const [widgets, setWidgets] = useState(["calendar", "week", "month"]);
	const [days, setDays] = useState(dummyDays);

	// console.log(jwtDecode(location.hash.split("=")[1]));

	const onDragEndHandler = (result: DropResult) => {
		const { type } = result;
		if (type === "WIDGETS") reorder(result, widgets, setWidgets);
		else if (type === "PANNELS") reorder(result, pannels, setPannels);
		else if (type.includes("ENTRIES")) reorderDays(result, days, setDays);
	};

	return (
		<div className="grid grid-cols-12 py-8 2xl:px-0 px-4 2xl:container 2xl:mx-auto">
			<Sidebar />
			<main className="col-span-10">
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
										<Tracking key={id} id={id} idx={idx} days={days} />
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

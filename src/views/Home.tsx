import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import { Sidebar } from "components/Sidebar";
import { Widgets } from "components/Widgets";
import { Days } from "components/Days";
import { NewEntry } from "components/NewEntry";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
	const [widgetsOrder, setWidgetsOrder] = useState([
		"calendar",
		"week",
		"month",
	]);

	const onDragEndHandler = (result: DropResult) => {
		if (result.type === "WIDGETS") reorderWidgets(result);
	};

	const reorderWidgets = ({ source, destination }: DropResult) => {
		const newOrder = [...widgetsOrder];
		const [moved] = newOrder.splice(source.index, 1);
		newOrder.splice(destination!.index, 0, moved);
		setWidgetsOrder(newOrder);
	};

	return (
		<div className="grid grid-cols-12 gap-4 py-8 2xl:px-0 px-4 2xl:container 2xl:mx-auto">
			<Sidebar />
			<DragDropContext onDragEnd={onDragEndHandler}>
				<main className="relative col-span-10 flex gap-4 justify-between">
					<div style={{ flex: "1 0 25%", maxWidth: "25%" }}>
						<Widgets order={widgetsOrder} />
					</div>

					<div
						className="absolute left-1/4 h-full px-4"
						style={{ width: "42%" }}
					>
						<Days />
					</div>

					<div
						className="h-max"
						style={{ flex: "1 0 33%", maxWidth: "33%" }}
					>
						<NewEntry />
					</div>
				</main>
			</DragDropContext>
		</div>
	);
};

/**
 * Base
 */
import { memo, useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useQuery } from "@apollo/client";
import moment from "moment";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	updateActiveMonthDays,
	selectActiveMonthDays,
	setMonths,
	setActiveMonthDays,
} from "store/tracking.slice";

/**
 * Utilities & types
 */
import { reorder, reorderDays } from "lib/reorder";
import type { DayType } from "lib/SharedTypes";
import { GET_USER_MONTHS } from "lib/graphql/month.queries";

/**
 * Components
 */
import { Sidebar } from "components/Sidebar";
import { Widgets } from "components/pannels/Widgets";
import { NewEntry } from "components/pannels/NewEntry";
import { Tracking } from "components/pannels/Tracking";
import { Notifications } from "ui/misc/Notifications";
import { addNotification } from "store/app.slice";

interface HomeProps {}

export const Home: React.FC<HomeProps> = memo(() => {
	const [pannels, setPannels] = useState(["widgets", "tracking", "newEntry"]);
	const [widgets, setWidgets] = useState(["calendar", "week", "month"]);
	const activeMonthDays = useSelector(selectActiveMonthDays);
	const dispatch = useDispatch();
	const { loading, error, data } = useQuery(GET_USER_MONTHS);

	useEffect(() => {
		if (!loading) {
			dispatch(setMonths(data.getUserMonths));
			dispatch(setActiveMonthDays(moment().format("YYYY-MM")));
		} else if (error) {
			console.log(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading]);

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
										<Tracking
											key={id}
											id={id}
											idx={idx}
											days={activeMonthDays}
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
			<button
				className="bg-app-accent-blue rounded text-white p-2"
				onClick={() => {
					dispatch(
						addNotification({
							id: new Date().toISOString(),
							title: "Lorem Ipsum",
							text: "Lorem ipsum dolor sit amet",
							type: "normal",
						})
					);
					dispatch(
						addNotification({
							id: new Date().toISOString(),
							title: "Lorem Ipsum",
							text: "Lorem ipsum dolor sit amet",
							type: "success",
						})
					);
					dispatch(
						addNotification({
							id: new Date().toISOString(),
							title: "Lorem Ipsum",
							text: "Lorem ipsum dolor sit amet",
							type: "error",
						})
					);
				}}
			>
				NOTIFY
			</button>
			<Notifications position="tl" />
			<Notifications position="tr" />
			<Notifications position="bl" />
			<Notifications position="br" />
		</div>
	);
});

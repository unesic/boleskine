import { Dispatch, SetStateAction } from "react";
import { DropResult } from "react-beautiful-dnd";
import { TrackingType } from "components/pannels/Tracking";

export const reorder = (
	{ source, destination }: DropResult,
	state: string[],
	setState: Dispatch<SetStateAction<string[]>>
) => {
	if (!destination) return;

	const newOrder = [...state];
	const [moved] = newOrder.splice(source.index, 1);
	newOrder.splice(destination.index, 0, moved);
	setState(newOrder);
};

export const reorderDays = (
	{ source, destination }: DropResult,
	state: TrackingType,
	setState: Dispatch<SetStateAction<TrackingType>>
) => {
	if (!destination) return;

	const newDays = [...state];
	const day = newDays.find(({ id }) => id === source.droppableId);
	if (!day) return;
	const dayIdx = state.findIndex(({ id }) => id === day.id);

	const newEntries = [...day.entries];
	const [moved] = newEntries.splice(source.index, 1);
	newEntries.splice(destination.index, 0, moved);
	day.entries = [...newEntries];

	newDays.splice(dayIdx, 1, day);
	setState(newDays);
};

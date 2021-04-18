import React from "react";
import { Droppable } from "react-beautiful-dnd";
import moment from "moment";

import { Entries, EntriesType } from "./Entries";

export type DayType = {
	id: string;
	date: Date;
	entries: EntriesType;
};

interface DayProps {
	id: string;
	date: Date;
	entries: EntriesType;
	dropDisabled: boolean;
}

export const Day: React.FC<DayProps> = ({
	id,
	date,
	entries,
	dropDisabled,
}) => {
	return (
		<div className="Tracking__Day">
			<div className="Tracking__Day__Heading">
				{moment(date).format("ddd DD MMMM[,] YYYY")}
			</div>
			<Droppable droppableId={id} type="ENTRIES" isDropDisabled={dropDisabled}>
				{(provided) => <Entries entries={entries} provided={provided} />}
			</Droppable>
		</div>
	);
};

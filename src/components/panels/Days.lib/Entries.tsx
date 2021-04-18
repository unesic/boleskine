import React from "react";
import { DroppableProvided } from "react-beautiful-dnd";

import "assets/dist/components/Entries.css";
import { Entry, EntryType } from "./Entry";

export type EntriesType = EntryType[];

interface EntriesProps {
	entries: EntryType[];
	provided: DroppableProvided;
}

export const Entries: React.FC<EntriesProps> = ({ entries, provided }) => {
	return (
		<div
			className="Entries"
			ref={provided.innerRef}
			{...provided.droppableProps}
		>
			{entries.map((entry, idx) => (
				<Entry key={entry.id} {...entry} idx={idx} />
			))}
			{provided.placeholder}
		</div>
	);
};

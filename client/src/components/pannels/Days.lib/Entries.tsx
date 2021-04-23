import { Droppable } from "react-beautiful-dnd";

import "assets/dist/components/Entries.css";
import { Entry, EntryType } from "./Entry";

export type EntriesType = EntryType[];

interface EntriesProps {
	dayId: string;
	entries: EntryType[];
}

export const Entries: React.FC<EntriesProps> = ({ dayId, entries }) => {
	return (
		<Droppable droppableId={dayId} type={`ENTRIES-${dayId}`}>
			{({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
				<div className="Entries" ref={innerRef} {...droppableProps}>
					{entries.map((entry, idx) => (
						<Entry
							key={entry.id}
							{...entry}
							idx={idx}
							draggingOver={isDraggingOver}
						/>
					))}
					{placeholder}
				</div>
			)}
		</Droppable>
	);
};

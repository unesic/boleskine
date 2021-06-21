/**
 * Base
 */
import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";

/**
 * Types & Components
 */
import type { EntryType } from "lib/SharedTypes";
import { Entry } from "./Entry";

interface EntriesProps {
	dayId: string;
	entries: EntryType[];
}

export const Entries: React.FC<EntriesProps> = memo(({ dayId, entries }) => {
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
});

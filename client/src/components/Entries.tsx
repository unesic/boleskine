/**
 * Base
 */
import { memo } from "react";

/**
 * Types & Components
 */
import type { EntryType } from "lib/types/shared.types";
import { Entry } from "./Entry";

interface EntriesProps {
	dayId: string;
	entries: EntryType[];
}

export const Entries: React.FC<EntriesProps> = memo(({ dayId, entries }) => {
	return (
		<div className="Entries">
			{entries.map((entry, idx) => (
				<Entry key={entry.id} {...entry} />
			))}
		</div>
	);
});

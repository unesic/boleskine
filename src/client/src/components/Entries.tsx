/**
 * Base
 */
import { memo } from "react";

/**
 * Types & Components
 */
import type { EntryType } from "lib/types/shared.types";
import { Entry } from "components/Entry";

interface EntriesProps {
	dayId: string;
	entries: EntryType[];
}

export const Entries: React.FC<EntriesProps> = memo(({ dayId, entries }) => {
	return (
		<div className="Entries">
			{entries.map((entry) => (
				<Entry key={entry.id} {...entry} />
			))}
		</div>
	);
});

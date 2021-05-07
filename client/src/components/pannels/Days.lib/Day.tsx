/**
 * Base
 */
import { memo } from "react";
import moment from "moment";

/**
 * Types
 */
import type { EntriesType } from "lib/SharedTypes";

/**
 * Components
 */
import { Entries } from "./Entries";

interface DayProps {
	id: string;
	date: string;
	entries: EntriesType;
}

export const Day: React.FC<DayProps> = memo(({ id, date, entries }) => {
	return (
		<div className="Tracking__Day">
			<div className="Tracking__Day__Heading">
				{moment(date).format("ddd DD MMMM[,] YYYY")}
			</div>
			<Entries entries={entries} dayId={id} />
		</div>
	);
});

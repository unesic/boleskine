import { FC } from "react";
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
}

export const Day: FC<DayProps> = ({ id, date, entries }) => {
	return (
		<div className="Tracking__Day">
			<div className="Tracking__Day__Heading">
				{moment(date).format("ddd DD MMMM[,] YYYY")}
			</div>
			<Entries entries={entries} dayId={id} />
		</div>
	);
};

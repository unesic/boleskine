import moment from "moment";
import type { DayType, EntriesType, EntryType } from "./SharedTypes";

export function formatEntries(entries: EntriesType): DayType[] {
	const days: any = {};
	entries.forEach((entry: EntryType) => {
		const date = moment(entry.timestamp).format("YYYY-MM-DD");

		if (Array.isArray(days[date]?.entries)) {
			days[date].entries.push(entry);
		} else {
			days[date] = {
				id: date,
				date: date,
				entries: [entry],
			};
		}
	});
	const res = Object.entries(days).map(([_, day]) => day);
	return res as DayType[];
}

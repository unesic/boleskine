import moment from "moment";
import type { DayType, EntriesType, EntryType, MonthType } from "./SharedTypes";

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

export function sortMonthEntries(month: MonthType): EntriesType {
	const entries = [...month.entries];

	for (let i = 0; i < entries.length; i++) {
		for (let j = 0; j < entries.length - i - 1; j++) {
			const curr = moment(entries[j].timestamp);
			const next = moment(entries[j + 1].timestamp);
			const diff = curr.diff(next, "milliseconds");

			if (diff < 0) [entries[j + 1], entries[j]] = [entries[j], entries[j + 1]];
		}
	}

	return entries;
}

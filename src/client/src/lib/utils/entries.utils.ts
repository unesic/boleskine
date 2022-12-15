/**
 * Base
 */
import moment from "moment";

/**
 * Types
 */
import type { DayType, EntriesType, MonthType } from "lib/types/shared.types";

type MarkType = {
	date: string;
	marks: string[];
};

/**
 * Takes in an array of entries and returns
 * an array of days with corresponding entries.
 *
 * @param entries Array of raw entry data.
 * @returns An array of days with respective entries.
 */
export function formatActiveMonthEntries(entries: EntriesType): DayType[] {
	const res = entries.reduce((acc, curr) => {
		const date = moment(curr.timestamp).format("YYYY-MM-DD");
		const idx = acc.findIndex((day) => day.date === date);

		if (!acc.length || idx < 0) {
			acc.push({
				id: date,
				date: date,
				entries: [curr],
			});
		} else {
			acc[idx].entries.push(curr);
		}

		return acc;
	}, [] as DayType[]);

	return res;
}

/**
 * Takes in month's data and returns it's entries
 * sorted in descending order by timestamp.
 *
 * @param month Single month data.
 * @returns Given month's entries sorted.
 */
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

/**
 * Given an array of months, finds all unique entry dates and
 * returns an array of marks for each individual date.
 *
 * @param months An array of months.
 * @returns An array of marks for each corresponding month.
 */
export function getMarkedDates(months: MonthType[]) {
	// Helper function
	const format = (ts: string) => moment(ts).format("DD-MM-YYYY");

	// Extract entries from all months
	const entries = months.reduce(
		(acc, curr) => [...acc, ...curr.entries],
		[] as EntriesType
	);

	// Get all unique dates and set its marks
	const dates = [...new Set(entries.map(({ timestamp }) => format(timestamp)))];
	return dates.map((date) => {
		const flags: { [key: string]: boolean } = { inc: !!0, exp: !!0, not: !!0 };

		entries.forEach(({ timestamp, type }) => {
			if (format(timestamp) === date) flags[type] = true;
		});

		const marks = Object.entries(flags)
			.map(([k, v]) => (v ? k : !!0))
			.filter(Boolean) as string[];

		return { date, marks };
	}) as MarkType[];
}

/**
 * Given an array of all mark, finds all unique marks for corresponding month
 * and returns them along with the number of each mark's occurence.
 *
 * @param marked An array of marks for each corresponding date.
 * @returns An array of marks and marks' counts for each corresponding month.
 */
export function getMonthMarks(
	marked: MarkType[]
): [string[], { [key: string]: number }] {
	const marks = marked
		.map((m) => m.marks.map((mark) => mark))
		.reduce((acc, curr) => acc.concat(curr));

	const marksCounts = marks.reduce(
		(acc, curr) => ({ ...acc, [curr]: (acc[curr] || 0) + 1 }),
		{} as { [k: string]: number }
	);

	const sortedMarks = [...new Set(marks)].sort((a, b) => {
		if (marksCounts[a] > marksCounts[b]) return -1;
		else if (marksCounts[a] < marksCounts[b]) return 1;
		return 0;
	});

	return [sortedMarks, marksCounts];
}

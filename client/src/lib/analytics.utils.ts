import moment from "moment";
import { formatWeek, getWeekEnd, getWeekStart } from "./dateFormatter";
import { EntriesType, EntryType, MonthType } from "./SharedTypes";
import {
	AnalysisTypeEntries,
	AnalysisTypes,
	MasterDataType,
	Periods,
	SplitData,
	TotalType,
} from "./_analytics.types";

export function formatLabel(
	label: string,
	weekFormat: "range" | "number" = "number",
	includeYear = false,
	tooltip = false
) {
	const els = label.split("-");
	const len = els.length;
	if (len === 2) {
		return `${els[1]}, ${els[0]}`;
	} else if (len === 3) {
		return tooltip
			? moment(label, "YYYY-[Q]Q-MM").format("MMMM, YYYY")
			: moment(label, "YYYY-[Q]Q-MM").format("MMM");
	} else if (len === 4) {
		if (weekFormat === "range") {
			const week = moment().week(parseInt(els[3])).toISOString();
			const startDate = getWeekStart(week);
			const endDate = getWeekEnd(week);
			return formatWeek([startDate, endDate], includeYear);
		} else {
			return `Week ${els[3]}`;
		}
	}
	return label;
}

export function splitDataYears(months: MonthType[]): SplitData {
	return months.reduce(
		(acc: { [key: string]: MonthType[] }, curr: MonthType) => {
			const year = curr.date.split("-")[0];
			const isArray = Array.isArray(acc[year]);
			if (isArray) {
				acc[year] = [...acc[year], curr];
			} else {
				acc[year] = [curr];
			}

			return acc;
		},
		{}
	);
}

export function getMasterData(data: SplitData) {
	const totals: MasterDataType = {};
	Object.keys(data).forEach((year: string) => {
		totals[year] = { wow: null, mom: null, qoq: null };

		const formatted = _getFormattedYear(data, year);

		(Object.keys(formatted) as (keyof typeof Periods)[]).forEach((type) => {
			totals[year][type] = null;

			Object.entries(formatted[type as any]).forEach(
				([key, value]: [key: string, value: EntriesType]) => {
					const total = _calculateTotals(key, value);
					if (!total.inc && !total.exp) return;

					const isArray = Array.isArray(totals[year][type]);
					totals[year][type] = isArray
						? [...(totals[year][type] as TotalType[]), total]
						: [total];
				}
			);

			(totals[year][type] as TotalType[]).sort((curr: any, next: any) =>
				curr.key < next.key ? -1 : curr.key > next.key ? 1 : 0
			);
		});
	});

	return totals;
}

function _getFormattedYear(data: SplitData, year: string): AnalysisTypes {
	return Object.entries(Periods).reduce((acc, [key, value]) => {
		acc[value as any] = _formatMonths(
			Periods[key as any] as keyof typeof Periods,
			data[year]
		);
		return acc;
	}, {} as { [key in Periods]: AnalysisTypeEntries });
}

function _formatMonths(
	type: keyof typeof Periods,
	months: MonthType[]
): AnalysisTypeEntries {
	return months
		.map((month) => month.entries)
		.reduce((acc: EntriesType, curr: EntriesType) => [...acc, ...curr], [])
		.reduce((acc: { [key: string]: EntriesType }, curr: EntryType) => {
			const timestamp = moment(curr.timestamp);
			let key;
			switch (Periods[type]) {
				case Periods.wow:
					key = timestamp.format("YYYY-[Q]Q-MM-ww");
					break;
				case Periods.mom:
					key = timestamp.format("YYYY-[Q]Q-MM");
					break;
				case Periods.qoq:
					key = timestamp.format("YYYY-[Q]Q");
					break;
				default:
					key = timestamp.format("YYYY-[Q]Q-MM-ww");
					break;
			}

			const isArray = Array.isArray(acc[key]);
			acc[key] = isArray ? [...acc[key], curr] : [curr];

			return acc;
		}, {});
}

function _calculateTotals(type: string, entries: EntriesType) {
	return entries.reduce(
		(acc, curr) => {
			if (curr.type === "inc") {
				acc.inc += parseFloat(curr.amount!);
			} else if (curr.type === "exp") {
				acc.exp += parseFloat(curr.amount!);
			}
			return acc;
		},
		{ key: type, inc: 0, exp: 0 } as TotalType
	);
}

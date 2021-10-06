import moment from "moment";
import { EntriesType, EntryType, MonthType } from "lib/types/shared.types";
import {
	AnalysisTypeEntries,
	AnalysisTypes,
	MasterDataType,
	Periods,
	SplitData,
	TotalType,
} from "lib/types/analytics.types";

/**
 * Given an array of months, creates and object
 * where keys are years and values are months.
 *
 * @param months Array of months.
 * @returns An object of year-months entries.
 */
export function splitDataYears(months: MonthType[]): SplitData {
	return months.reduce((acc, curr) => {
		const year = curr.date.split("-")[0];
		const isArray = Array.isArray(acc[year]);
		if (!isArray) acc[year] = [curr];
		else acc[year] = [...acc[year], curr];

		return acc;
	}, {} as { [key: string]: MonthType[] });
}

/**
 * This is a tricky one.
 * Given an object of year-months entries, calculate
 * WOW, MOM, QOQ totals for both income and expenses.
 *
 * @param data An object of year-month entries.
 * @returns An object of all years with all periods' totals.
 */
export function getMasterData(data: SplitData) {
	const totals: MasterDataType = {};
	Object.keys(data).forEach((year: string) => {
		const formatted = _getFormattedYear(data, year);
		totals[year] = { wow: null, mom: null, qoq: null };

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

			(totals[year][type] as TotalType[])?.sort((curr: any, next: any) =>
				curr.key < next.key ? -1 : curr.key > next.key ? 1 : 0
			);
		});
	});

	return totals;
}

/**
 * Helper function.
 *
 * Given a year and main data structure,
 * generates period specific totals with properly
 * formatted keys for each corresponding sub-structure.
 *
 * @param data An object of year–month entries.
 * @param year String used to format nested keys.
 * @returns An object with period specific totals.
 */
function _getFormattedYear(data: SplitData, year: string): AnalysisTypes {
	return Object.entries(Periods).reduce(
		(acc, [key, value]) => ({
			...acc,
			[value as any]: _formatMonths(key, data[year]),
		}),
		{} as { [key in Periods]: AnalysisTypeEntries }
	);
}

/**
 * Helper function.
 *
 * Given a period type and an array of months,
 * generates object with properly formatted keys
 * for given period and array of entries as a value.
 *
 * @param type Type of period.
 * @param months An array of months.
 * @returns
 */
function _formatMonths(type: string, months: MonthType[]): AnalysisTypeEntries {
	return months
		.map((month) => month.entries)
		.reduce((acc: EntriesType, curr: EntriesType) => [...acc, ...curr], [])
		.reduce((acc: { [key: string]: EntriesType }, curr: EntryType) => {
			const timestamp = moment(curr.timestamp);
			let key;
			switch (type) {
				case "wow":
					key = timestamp.format("YYYY-[Q]Q-MM-ww");
					break;
				case "mom":
					key = timestamp.format("YYYY-[Q]Q-MM");
					break;
				case "qoq":
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

/**
 * Helper function.
 *
 * Given an array of entries and type,
 * calculates the inc/exp totals.
 *
 * @param type Type of total ("wow" | "mom" | "qoq").
 * @param entries An array of entries.
 * @returns An object with calculated total income and expense.
 */
function _calculateTotals(type: string, entries: EntriesType) {
	return entries.reduce(
		(acc, curr) => ({
			...acc,
			[curr.type]: (acc as any)[curr.type] + parseFloat(curr.amount!),
		}),
		{ key: type, inc: 0, exp: 0 } as TotalType
	);
}

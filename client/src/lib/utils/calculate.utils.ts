import moment from "moment";
import { getWeekEnd, getWeekStart } from "lib/utils/date.utils";
import { DayType, EntryType } from "lib/types/shared.types";

export function calculateMonthTotals(days: DayType[]) {
	const totals = days
		.reduce((acc: EntryType[], curr) => acc.concat(curr.entries), [])
		.reduce(
			(acc, curr) => {
				if (curr.type === "inc") {
					acc.inc += parseFloat(curr.amount!);
				} else if (curr.type === "exp") {
					acc.exp += parseFloat(curr.amount!);
				}

				return acc;
			},
			{ inc: 0, exp: 0 }
		);

	return totals;
}

export function calculateWeekTotals(
	days: DayType[],
	date: string
): [string, string, { inc: number; exp: number }] {
	const startDate = getWeekStart(date);
	const endDate = getWeekEnd(date);

	const totals = days
		.reduce((acc: EntryType[], curr) => acc.concat(curr.entries), [])
		.reduce(
			(acc, curr) => {
				const isDateInRange = moment(curr.timestamp).isBetween(
					startDate,
					endDate
				);

				if (isDateInRange) {
					if (curr.type === "inc") {
						acc.inc += parseFloat(curr.amount!);
					} else if (curr.type === "exp") {
						acc.exp += parseFloat(curr.amount!);
					}
				}
				return acc;
			},
			{ inc: 0, exp: 0 }
		);

	return [startDate, endDate, totals];
}

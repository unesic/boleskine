import moment from "moment";
import { getWeekEnd, getWeekStart } from "./dateFormatter";
import { DayType, EntryType } from "./SharedTypes";

// new Intl.DateTimeFormat("en-US", {
// 	weekday: "short",
// 	year: "numeric",
// 	month: "short",
// 	day: "numeric",
// }).format(new Date())

export const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

export const compactCurrency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	notation: "compact",
	minimumFractionDigits: 1,
	maximumFractionDigits: 2,
});

export function calculateActiveMonthTotals(days: DayType[]) {
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

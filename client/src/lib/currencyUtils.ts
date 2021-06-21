import moment from "moment";
import { DayType, EntryType } from "./SharedTypes";

export const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

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
	const startDate = moment(date).startOf("isoWeek").subtract(1, "day");
	const endDate = moment(date).startOf("isoWeek").add(7, "days");

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

	return [startDate.toISOString(), endDate.toISOString(), totals];
}

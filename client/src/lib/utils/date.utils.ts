import moment from "moment";

export function formatMonth(date: string): string {
	return moment(date).format("MMMM[,] YYYY");
}

export function formatWeek(date: string[], includeYear = true): string {
	const startDate = moment(date[0]).format("DD MMM");
	const endDate = moment(date[1]).format(
		includeYear ? "DD MMM[,] YYYY" : "DD MMM"
	);

	return `${startDate} - ${endDate}`;
}

export function getWeekStart(date: string): string {
	return moment(date).startOf("isoWeek").toISOString();
}

export function getWeekEnd(date: string): string {
	return moment(date).startOf("isoWeek").add(6, "days").toISOString();
}

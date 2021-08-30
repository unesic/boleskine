import { useMoment } from "lib/hooks/useMoment";

export const useFormatWeek = () => {
	const moment = useMoment();

	return (date: string[]) =>
		`${moment(date[0]).format("ll")} - ${moment(date[1]).format("ll")}`;
};

export const useFormatMonth = () => {
	const moment = useMoment();
	return (date: any) => moment(date.month).format("MMMM[,] YYYY");
};

export const useGetWeekStart = () => {
	const moment = useMoment();
	return (date: string) => moment(date).startOf("isoWeek").toISOString();
};

export const useGetWeekEnd = () => {
	const moment = useMoment();
	return (date: string) =>
		moment(date).startOf("isoWeek").add(6, "days").toISOString();
};

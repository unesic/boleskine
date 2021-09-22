/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectCurrency, selectLanguage } from "store/auth.slice";

/**
 * Utils
 */
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

export const useCurrencyFormatter = (compact = false) => {
	const language = useSelector(selectLanguage);
	const currency = useSelector(selectCurrency);

	return new Intl.NumberFormat(language ?? "en", {
		style: "currency",
		currency: currency ?? "EUR",
		notation: compact ? "compact" : "standard",
		minimumFractionDigits: compact ? 1 : 2,
		maximumFractionDigits: compact ? 2 : 2,
	});
};

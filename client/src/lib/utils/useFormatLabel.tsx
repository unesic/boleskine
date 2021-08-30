import { useMoment } from "lib/hooks/useMoment";
import { useTranslation } from "lib/hooks/useTranslation";
import {
	useFormatWeek,
	useGetWeekEnd,
	useGetWeekStart,
} from "lib/utils/useFormat";

export const useFormatLabel = () => {
	const _t = useTranslation("app");
	const moment = useMoment();
	const getWeekStart = useGetWeekStart();
	const getWeekEnd = useGetWeekEnd();
	const formatWeek = useFormatWeek();

	return (
		label: string,
		weekFormat: "range" | "number" = "number",
		tooltip = false
	) => {
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
				return formatWeek([startDate, endDate]);
			} else {
				return `${_t.analytics.week} ${els[3]}`;
			}
		}
		return label;
	};
};

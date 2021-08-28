/**
 * Base
 */
import { calculateWeekTotals } from "lib/utils/calculate.utils";
import { formatWeek } from "lib/utils/date.utils";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectActiveDate, selectActiveMonthDays } from "store/tracking.slice";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Totals } from "./Totals";

interface CurrentWeekProps {}

export const CurrentWeek: React.FC<CurrentWeekProps> = memo(() => {
	const activeMonthDays = useSelector(selectActiveMonthDays);
	const activeDate = useSelector(selectActiveDate);

	const [startDate, endDate, totals] = useMemo(
		() => calculateWeekTotals(activeMonthDays, activeDate.day),
		[activeMonthDays, activeDate]
	);

	return (
		<Card>
			<Header title={formatWeek([startDate, endDate])} />
			<Totals income={totals.inc} expense={totals.exp} />
		</Card>
	);
});

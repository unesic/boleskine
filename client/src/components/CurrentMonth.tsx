/**
 * Base
 */
import { memo, useMemo } from "react";
import moment from "moment";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectActiveDate, selectActiveMonthDays } from "store/tracking.slice";

/**
 * Utilities & Components
 */
import { calculateMonthTotals } from "lib/utils/calculate.utils";
import { Card, Header } from "ui/card";
import { Totals } from "./Totals";
import { formatMonth } from "lib/utils/date.utils";

interface CurrentMonthProps {}

export const CurrentMonth: React.FC<CurrentMonthProps> = memo(() => {
	const activeMonthDays = useSelector(selectActiveMonthDays);
	const activeDate = useSelector(selectActiveDate);

	const totals = useMemo(() => calculateMonthTotals(activeMonthDays), [
		activeMonthDays,
	]);

	return (
		<Card>
			<Header title={formatMonth(moment(activeDate.month).toISOString())} />
			<Totals income={totals.inc} expense={totals.exp} />
		</Card>
	);
});

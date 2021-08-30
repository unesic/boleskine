/**
 * Base
 */
import { memo } from "react";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectActiveDate, selectActiveMonthDays } from "store/tracking.slice";

/**
 * Utilities
 */
import { useFormatMonth } from "lib/utils/useFormat";
import { useCalculateMonthTotals } from "lib/utils/useTotals";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Totals } from "components/Totals";

interface CurrentMonthProps {}

export const CurrentMonth: React.FC<CurrentMonthProps> = memo(() => {
	const activeDate = useSelector(selectActiveDate);
	const activeMonthDays = useSelector(selectActiveMonthDays);

	const formatMonth = useFormatMonth();
	const totals = useCalculateMonthTotals(activeMonthDays);

	return (
		<Card>
			<Header title={formatMonth(activeDate.month)} />
			<Totals income={totals.inc} expense={totals.exp} />
		</Card>
	);
});

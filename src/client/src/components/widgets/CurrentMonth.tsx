/**
 * Base
 */
import { memo } from "react";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectActiveDate, selectActiveDays } from "store/track.slice";

/**
 * Utilities
 */
import { useFormatMonth } from "lib/hooks/utils/useFormat";
import { useCalculateMonthTotals } from "lib/hooks/utils/useTotals";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Totals } from "components/Totals";

interface CurrentMonthProps {}

export const CurrentMonth: React.FC<CurrentMonthProps> = memo(() => {
	const activeDate = useSelector(selectActiveDate);
	const activeDays = useSelector(selectActiveDays);

	const formatMonth = useFormatMonth();
	const totals = useCalculateMonthTotals(activeDays);

	return (
		<div className="Widget--CurrentMonth">
			<Card>
				<Header title={formatMonth(activeDate)} />
				<Totals
					income={totals.inc}
					expense={totals.exp}
					testId="current-month"
				/>
			</Card>
		</div>
	);
});

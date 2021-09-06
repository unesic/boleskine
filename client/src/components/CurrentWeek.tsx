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
import { useFormatWeek } from "lib/utils/useFormat";
import { useCalculateWeekTotals } from "lib/utils/useTotals";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Totals } from "components/Totals";

interface CurrentWeekProps {}

export const CurrentWeek: React.FC<CurrentWeekProps> = memo(() => {
	const activeDate = useSelector(selectActiveDate);
	const activeDays = useSelector(selectActiveDays);

	const formatWeek = useFormatWeek();
	const [startDate, endDate, totals] = useCalculateWeekTotals(
		activeDays,
		activeDate.day
	);

	return (
		<Card>
			<Header title={formatWeek([startDate, endDate])} />
			<Totals income={totals.inc} expense={totals.exp} />
		</Card>
	);
});

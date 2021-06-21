/**
 * Base
 */
import { calculateWeekTotals } from "lib/currencyUtils";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectActiveDate, selectActiveMonthDays } from "store/tracking.slice";

/**
 * Components
 */
import { DraggableCard, Header } from "ui/card";
import { Totals } from "./Totals";

interface CurrentWeekProps {
	id: string;
	idx: number;
}

export const CurrentWeek: React.FC<CurrentWeekProps> = memo(({ id, idx }) => {
	const activeMonthDays = useSelector(selectActiveMonthDays);
	const activeDate = useSelector(selectActiveDate);

	const [startDate, endDate, totals] = useMemo(
		() => calculateWeekTotals(activeMonthDays, activeDate.day),
		[activeMonthDays, activeDate]
	);

	return (
		<DraggableCard draggableId={id} index={idx}>
			{(dragHandleProps) => (
				<>
					<Header title="Current week" yMove dragHandleY={dragHandleProps} />
					<Totals
						date={[startDate, endDate]}
						income={totals.inc}
						expense={totals.exp}
					/>
				</>
			)}
		</DraggableCard>
	);
});

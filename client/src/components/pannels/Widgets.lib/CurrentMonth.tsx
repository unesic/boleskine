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
import { calculateActiveMonthTotals } from "lib/currency.utils";
import { DraggableCard, Header } from "ui/card";
import { Totals } from "./Totals";

interface CurrentMonthProps {
	id: string;
	idx: number;
}

export const CurrentMonth: React.FC<CurrentMonthProps> = memo(({ id, idx }) => {
	const activeMonthDays = useSelector(selectActiveMonthDays);
	const activeDate = useSelector(selectActiveDate);

	const totals = useMemo(() => calculateActiveMonthTotals(activeMonthDays), [
		activeMonthDays,
	]);

	return (
		<DraggableCard draggableId={id} index={idx}>
			{(dragHandleProps) => (
				<>
					<Header
						title="Current month"
						// yMove
						// dragHandleY={dragHandleProps}
						noClose
						noSettings
					/>
					<Totals
						date={[moment(activeDate.month).toISOString()]}
						income={totals.inc}
						expense={totals.exp}
					/>
				</>
			)}
		</DraggableCard>
	);
});

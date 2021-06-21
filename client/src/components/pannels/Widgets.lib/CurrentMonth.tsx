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
import { calculateMonthTotals } from "lib/currencyUtils";
import { DraggableCard, Header } from "ui/card";
import { Totals } from "./Totals";

interface CurrentMonthProps {
	id: string;
	idx: number;
}

export const CurrentMonth: React.FC<CurrentMonthProps> = memo(({ id, idx }) => {
	const activeMonthDays = useSelector(selectActiveMonthDays);
	const activeDate = useSelector(selectActiveDate);

	const totals = useMemo(() => calculateMonthTotals(activeMonthDays), [
		activeMonthDays,
	]);

	return (
		<DraggableCard draggableId={id} index={idx}>
			{(dragHandleProps) => (
				<>
					<Header title="Current month" yMove dragHandleY={dragHandleProps} />
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

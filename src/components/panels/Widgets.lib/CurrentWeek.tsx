import { DraggableCard, Header } from "ui/card";
import { Totals } from "./Totals";

interface CurrentWeekProps {
	id: string;
	idx: number;
}

export const CurrentWeek: React.FC<CurrentWeekProps> = ({ id, idx }) => {
	const dates = [new Date().toISOString(), new Date().toISOString()];

	return (
		<DraggableCard draggableId={id} index={idx}>
			{(dragHandleProps) => (
				<>
					<Header title="Current week" yMove dragHandleY={dragHandleProps} />
					<Totals date={dates} income={1337} expense={360} />
				</>
			)}
		</DraggableCard>
	);
};

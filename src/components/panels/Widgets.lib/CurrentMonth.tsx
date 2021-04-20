import { DraggableCard, Header } from "ui/card";
import { Totals } from "./Totals";

interface CurrentMonthProps {
	id: string;
	idx: number;
}

export const CurrentMonth: React.FC<CurrentMonthProps> = ({ id, idx }) => {
	return (
		<DraggableCard draggableId={id} index={idx}>
			{(dragHandleProps) => (
				<>
					<Header title="Current month" yMove dragHandleY={dragHandleProps} />
					<Totals
						date={[new Date().toISOString()]}
						income={69420}
						expense={42069.96}
					/>
				</>
			)}
		</DraggableCard>
	);
};

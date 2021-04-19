import { Draggable } from "react-beautiful-dnd";

import Card, { Header } from "ui/card/Card";
import { Totals } from "./Totals";

interface CurrentWeekProps {
	id: string;
	idx: number;
}

export const CurrentWeek: React.FC<CurrentWeekProps> = ({ id, idx }) => {
	return (
		<Draggable draggableId={id} index={idx}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Card>
						<Header
							title="Current week"
							yMove
							dragHandleY={provided.dragHandleProps}
						/>
						<Totals
							date={[new Date().toISOString(), new Date().toISOString()]}
							income={1337}
							expense={360}
						/>
					</Card>
				</div>
			)}
		</Draggable>
	);
};

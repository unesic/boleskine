import "assets/dist/components/Tracking.css";

import { DraggableCard, Header } from "ui/card";
import { Day, DayType } from "./Days.lib/Day";

export type TrackingType = DayType[];

interface TrackingProps {
	id: string;
	idx: number;
	days: TrackingType;
}

export const Tracking: React.FC<TrackingProps> = ({ id, idx, days }) => {
	return (
		<DraggableCard
			draggableId={id}
			index={idx}
			className="col-span-5 px-2 h-full"
		>
			{(dragHandleProps) => (
				<>
					<Header title="Tracking" xMove dragHandleX={dragHandleProps} />
					<div className="Tracking">
						<div className="Tracking__inner">
							{days.map((day) => (
								<Day key={day.id} {...day} />
							))}
						</div>
					</div>
				</>
			)}
		</DraggableCard>
	);
};

import React from "react";

import "assets/dist/components/Days.css";
import { Day, DayType } from "./Day";

export type DaysType = DayType[];

interface DaysProps {
	days: DayType[];
}

export const Days: React.FC<DaysProps> = ({ days }) => {
	return (
		<div className="Days">
			{days.map((day) => (
				<Day key={day.id} {...day} />
			))}
		</div>
	);
};

import { useMemo } from "react";
import { getMonthMarks } from "lib/entriesFormatter";
import { CalendarMarker } from "ui/misc/CalendarMarker";

interface CalendarMarkersProps {
	view: string;
	marked: {
		date: string;
		marks: string[];
	}[];
}

export const CalendarMarkers: React.FC<CalendarMarkersProps> = ({
	view,
	marked,
}) => {
	const [counts, markers] = useMemo(() => getMonthMarks(marked), [marked]);

	return (
		<span className="markers">
			{view === "year"
				? markers.map((marker, idx) => (
						<CalendarMarker
							key={idx}
							type={marker}
							text={counts[marker] > 1 ? counts[marker] : null}
						/>
				  ))
				: marked.map((m) =>
						m.marks.map((marker, idx) => (
							<CalendarMarker key={idx} type={marker} />
						))
				  )}
		</span>
	);
};

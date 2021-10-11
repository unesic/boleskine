/**
 * Base
 */
import { useMemo, memo } from "react";

/**
 * Utilities
 */
import { getMonthMarks } from "lib/utils/entries.utils";

/**
 * Components
 */
import { CalendarMarker } from "ui/misc/CalendarMarker";

interface CalendarMarkersProps {
	view: string;
	marked: {
		date: string;
		marks: string[];
	}[];
}

export const CalendarMarkers: React.FC<CalendarMarkersProps> = memo(
	({ view, marked }) => {
		const [markers] = useMemo(() => getMonthMarks(marked), [marked, view]);

		return (
			<span className="markers">
				{view === "year"
					? markers.map((marker, idx) => (
							<CalendarMarker key={idx} type={marker} />
					  ))
					: marked.map((m) =>
							m.marks.map((marker, idx) => (
								<CalendarMarker key={idx} type={marker} />
							))
					  )}
			</span>
		);
	}
);

/**
 * Base
 */
import { memo } from "react";

interface CalendarMarkerProps {
	type: string;
	text?: number | null;
}

export const CalendarMarker: React.FC<CalendarMarkerProps> = memo(
	({ type, text = null }) => {
		return <span className={`marker marker--${type}`}>{text}•</span>;
	}
);

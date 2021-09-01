interface CalendarMarkerProps {
	type: string;
	text?: number | null;
}

export const CalendarMarker: React.FC<CalendarMarkerProps> = ({
	type,
	text = null,
}) => {
	return <span className={`marker marker--${type}`}>{text}•</span>;
};

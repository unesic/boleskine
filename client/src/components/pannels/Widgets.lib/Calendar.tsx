/**
 * Base
 */
import { memo, useEffect, useMemo, useState } from "react";
import ReactCalendar, { CalendarTileProperties } from "react-calendar";
import moment from "moment";
import "assets/dist/components/Calendar.css";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	selectActiveDate,
	setActiveDate,
	setActiveMonthDays,
} from "store/tracking.slice";

/**
 * Components
 */
import { DraggableCard, Header } from "ui/card";

/**
 * Icons
 */
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/outline";

interface CalendarProps {
	id: string;
	idx: number;
}

export const Calendar: React.FC<CalendarProps> = memo(({ id, idx }) => {
	const [calendarDate, setCalendarDate] = useState(new Date());
	const dispatch = useDispatch();
	const activeDate = useSelector(selectActiveDate);

	useEffect(() => {
		dispatch(setActiveDate(calendarDate.toISOString()));

		const newMonth = moment(calendarDate).format("YYYY-MM");
		if (newMonth !== activeDate.month) {
			dispatch(setActiveMonthDays(newMonth));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calendarDate]);

	const markedDates = useMemo(
		() => [
			{
				date: "30-04-2021",
				marks: ["inc", "exp", "not"],
			},
			{
				date: "04-05-2021",
				marks: ["inc", "exp", "not"],
			},
			{
				date: "07-05-2021",
				marks: ["inc", "exp", "not"],
			},
			{
				date: "09-05-2021",
				marks: ["not"],
			},
			{
				date: "10-05-2021",
				marks: ["inc", "not"],
			},
			{
				date: "13-05-2021",
				marks: ["not"],
			},
			{
				date: "17-05-2021",
				marks: ["exp", "not"],
			},
		],
		[]
	);

	const onChange = (value: Date | Date[]) => {
		setCalendarDate(value as Date);
	};

	const setTileClassName = (props: CalendarTileProperties): string | null => {
		const marked = findMarked(props.date);
		if (!marked) return null;
		return "react-calendar__month-view__days__day--marked";
	};

	const setTileDisabled = ({ date }: CalendarTileProperties): boolean => {
		return false;
		// const marked = findMarked(date);
		// return !marked ? true : false;
	};

	const setTileContent = ({
		date,
	}: CalendarTileProperties): JSX.Element | null => {
		const marked = findMarked(date);
		if (!marked) return null;

		return (
			<span className="markers">
				{marked.marks.map((mark) => (
					<span className={`marker marker--${mark}`}>•</span>
				))}
			</span>
		);
	};

	function findMarked(target: Date) {
		return markedDates.find(
			({ date }) => date === moment(target).format("DD-MM-YYYY")
		);
	}

	return (
		<DraggableCard draggableId={id} index={idx}>
			{(dragHandleProps) => (
				<>
					<Header title="Calendar" yMove dragHandleY={dragHandleProps} />
					<ReactCalendar
						value={calendarDate}
						onChange={onChange}
						tileClassName={setTileClassName}
						tileDisabled={setTileDisabled}
						tileContent={setTileContent}
						nextLabel={<ChevronRightIcon />}
						next2Label={<ChevronDoubleRightIcon />}
						prevLabel={<ChevronLeftIcon />}
						prev2Label={<ChevronDoubleLeftIcon />}
					/>
				</>
			)}
		</DraggableCard>
	);
});

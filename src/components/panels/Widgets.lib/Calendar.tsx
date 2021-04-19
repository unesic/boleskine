import { FC, useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import ReactCalendar, { CalendarTileProperties } from "react-calendar";
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/outline";
import moment from "moment";

import "assets/dist/components/Calendar.css";
import Card, { Header } from "ui/card/Card";

interface CalendarProps {
	id: string;
	idx: number;
}

export const Calendar: FC<CalendarProps> = ({ id, idx }) => {
	const [date, setDate] = useState(new Date());

	const markedDates = useMemo(
		() => [
			{
				date: "30-03-2021",
				marks: ["inc", "exp", "not"],
			},
			{
				date: "04-04-2021",
				marks: ["inc", "exp", "not"],
			},
			{
				date: "07-04-2021",
				marks: ["inc", "exp", "not"],
			},
			{
				date: "09-04-2021",
				marks: ["not"],
			},
			{
				date: "10-04-2021",
				marks: ["inc", "not"],
			},
			{
				date: "13-04-2021",
				marks: ["not"],
			},
			{
				date: "17-04-2021",
				marks: ["exp", "not"],
			},
		],
		[]
	);

	const onChange = (value: Date | Date[]) => {
		setDate(value as Date);
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
		<Draggable draggableId={id} index={idx}>
			{(provided) => (
				<div ref={provided.innerRef} {...provided.draggableProps}>
					<Card>
						<Header
							title="Calendar"
							yMove
							dragHandleY={provided.dragHandleProps}
						/>
						<ReactCalendar
							value={date}
							onChange={onChange}
							tileClassName={setTileClassName}
							tileDisabled={setTileDisabled}
							tileContent={setTileContent}
							nextLabel={<ChevronRightIcon />}
							next2Label={<ChevronDoubleRightIcon />}
							prevLabel={<ChevronLeftIcon />}
							prev2Label={<ChevronDoubleLeftIcon />}
						/>
					</Card>
				</div>
			)}
		</Draggable>
	);
};

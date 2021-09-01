/**
 * Base
 */
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import ReactCalendar, { CalendarTileProperties } from "react-calendar";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	selectActiveDate,
	selectMonths,
	setActiveDate,
	setActiveMonthDays,
} from "store/tracking.slice";
import { selectLanguage } from "store/auth.slice";

/**
 * Utilities
 */
import { useMoment } from "lib/hooks/useMoment";
import { useTranslation } from "lib/hooks/useTranslation";
import { getMarkedDates } from "lib/entriesFormatter";

/**
 * Components & Icons
 */
import { Card, Header } from "ui/card";
import { CalendarMarkers } from "ui/misc/CalendarMarkers";
import {
	ChevronDoubleLeftIcon,
	ChevronDoubleRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@heroicons/react/outline";

interface CalendarProps {}

export const Calendar: React.FC<CalendarProps> = memo(() => {
	const [calendarDate, setCalendarDate] = useState(new Date());

	const moment = useMoment();
	const _t = useTranslation("app");

	const dispatch = useDispatch();
	const activeDate = useSelector(selectActiveDate);
	const months = useSelector(selectMonths);
	const language = useSelector(selectLanguage);

	useEffect(() => {
		dispatch(setActiveDate(calendarDate.toISOString()));

		const newMonth = moment(calendarDate).format("YYYY-MM");
		if (newMonth !== activeDate.month) {
			dispatch(setActiveMonthDays(newMonth));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calendarDate]);

	const markedDates = useMemo(() => getMarkedDates(months), [months]);

	const onChange = useCallback(
		(value: Date | Date[]) => {
			setCalendarDate(value as Date);
		},
		[setCalendarDate]
	);

	const findMarked = useCallback(
		(target: Date, view: string) => {
			const supportedViews = ["month", "year"];
			if (supportedViews.indexOf(view) === -1) return [];

			const format = view === "month" ? "DD-MM-YYYY" : "MM-YYYY";
			const targetDate = moment(target).format(format);

			return markedDates.filter(({ date }) => {
				const entryDate = moment(date, "DD-MM-YYYY").format(format);
				return entryDate === targetDate;
			});
		},
		[markedDates, moment]
	);

	const setTileClassName = useCallback(
		({ date, view }: CalendarTileProperties): string | null => {
			const marked = findMarked(date, view);
			if (!marked.length) return null;
			return "react-calendar__month-view__days__day--marked";
		},
		[findMarked]
	);

	const setTileContent = useCallback(
		({ date, view }: CalendarTileProperties): JSX.Element | null => {
			const marked = findMarked(date, view);
			if (!marked.length) return null;

			return <CalendarMarkers view={view} marked={marked} />;
		},
		[findMarked]
	);

	return (
		<Card>
			<Header
				title={moment(calendarDate).format(`[${_t.calendar_title}] dddd, LL`)}
			/>
			<ReactCalendar
				locale={language}
				value={calendarDate}
				// value={[
				// 	moment(calendarDate).startOf("isoWeek").toDate(),
				// 	moment(calendarDate).endOf("isoWeek").toDate(),
				// ]}
				onChange={onChange}
				tileClassName={setTileClassName}
				tileContent={setTileContent}
				nextLabel={<ChevronRightIcon />}
				next2Label={<ChevronDoubleRightIcon />}
				prevLabel={<ChevronLeftIcon />}
				prev2Label={<ChevronDoubleLeftIcon />}
			/>
		</Card>
	);
});

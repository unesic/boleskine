/**
 * Base
 */
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

/**
 * Utilities & types
 */
import { formatEntries, sortMonthEntries } from "lib/entriesFormatter";
import type { DayType, MonthType } from "lib/SharedTypes";

export const Slice = createSlice({
	name: "tracking",
	initialState: {
		months: [] as MonthType[],
		activeDate: {
			month: moment().format("YYYY-MM"),
			day: moment().format("YYYY-MM-DD"),
		},
		activeMonthDays: [] as DayType[],
		activeMonthId: null as string | null,
	},
	reducers: {
		// Months reducers
		setMonths: (state, action) => {
			const mutableData = JSON.parse(JSON.stringify(action.payload));
			const months = mutableData.map((month: MonthType) => {
				month.entries = sortMonthEntries(month);
				return month;
			});
			state.months = months;
		},

		// Active month reducers
		setActiveDate: (state, action) => {
			const date = moment(action.payload);
			state.activeDate.day = date.format("YYYY-MM-DD");
			state.activeDate.month = date.format("YYYY-MM");

			const newActive = state.months.find(
				(month: MonthType) => month.date === date.format("YYYY-MM")
			);
			if (newActive) state.activeMonthId = newActive.id;
		},

		// Active month days reducers
		setActiveMonthDays: (state, action) => {
			const newActive = state.months.find(
				(month: MonthType) => month.date === action.payload
			);
			/**
			 * TODO:
			 * When non-existant month is selected, entry isn't added to the UI at first
			 * after reload it appears and the following ones are added properly
			 */
			if (newActive) {
				state.activeMonthDays = formatEntries(newActive.entries);
				state.activeMonthId = newActive.id;
			}
		},
		updateActiveMonthDays: (state, action) => {
			state.activeMonthDays = action.payload;
		},
		addEntryToActiveMonthDays: (state, action) => {
			const date = moment(action.payload.timestamp).format("YYYY-MM-DD");
			const day = state.activeMonthDays.find((d: DayType) => d.date === date);

			if (day) {
				day.entries.push(action.payload);
			} else {
				const newDay: DayType = {
					id: date,
					date: date,
					entries: [action.payload],
				};

				for (const [idx, day] of state.activeMonthDays.entries()) {
					const diff = moment(date).diff(moment(day.date), "milliseconds");

					if (diff > 0) {
						state.activeMonthDays.splice(idx, 0, newDay);
						break;
					}

					if (idx === state.activeMonthDays.length - 1) {
						state.activeMonthDays.push(newDay);
						break;
					}
				}
			}
		},
		removeEntryFromActiveMonthDays: (state, action) => {
			const date = moment(action.payload.timestamp).format("YYYY-MM-DD");
			const day = state.activeMonthDays.find((day) => day.date === date);
			if (!day) return;
			day.entries = day.entries.filter((e) => e.id !== action.payload.id);
		},
	},
});

export const selectMonths = (state: any) =>
	state.tracking.months as MonthType[];

export const selectActiveDate = (state: any) =>
	state.tracking.activeDate as { day: string; month: string };

export const selectActiveMonthDays = (state: any) =>
	state.tracking.activeMonthDays as DayType[];

export const selectActiveMonthId = (state: any) =>
	state.tracking.activeMonthId as string;

export const {
	// Months reducers
	setMonths,

	// Active month reducers
	setActiveDate,

	// Active month days reducers
	setActiveMonthDays,
	updateActiveMonthDays,
	addEntryToActiveMonthDays,
	removeEntryFromActiveMonthDays,
} = Slice.actions;
export default Slice.reducer;

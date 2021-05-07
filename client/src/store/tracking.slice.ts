/**
 * Base
 */
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

/**
 * Utilities & types
 */
import { formatEntries } from "lib/entriesFormatter";
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
	},
	reducers: {
		// Months reducers
		setMonths: (state, action) => {
			state.months = action.payload;
		},

		// Active month reducers
		setActiveDate: (state, action) => {
			state.activeDate.day = moment(action.payload).format("YYYY-MM-DD");
			state.activeDate.month = moment(action.payload).format("YYYY-MM");
		},

		// Active month days reducers
		setActiveMonthDays: (state, action) => {
			const newActive = state.months.find(
				(month: MonthType) => month.date === action.payload
			);
			if (newActive) state.activeMonthDays = formatEntries(newActive.entries);
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

				state.activeMonthDays.push(newDay);
			}
		},
		removeEntryFromActiveMonthDays: (state, action) => {
			const date = moment(action.payload.timestamp).format("YYYY-MM-DD");
			const day = state.activeMonthDays.find((day) => day.date === date);
			if (!day) return;
			day.entries = day.entries.filter(
				(entry) => entry.id !== action.payload.id
			);
		},
	},
});

export const selectMonths = (state: any) =>
	state.tracking.months as MonthType[];

export const selectActiveDate = (state: any) =>
	state.tracking.activeDate as { day: string; month: string };

export const selectActiveMonthDays = (state: any) =>
	state.tracking.activeMonthDays as DayType[];

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

/**
 * Base
 */
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

/**
 * Utilities & types
 */
import {
	formatActiveMonthEntries,
	sortMonthEntries,
} from "lib/utils/entries.utils";
import type { DayType, MonthType, EntryType } from "lib/types/shared.types";

type ActiveDate = {
	month: string;
	day: string;
};

interface ITracking {
	months: MonthType[];
	activeDate: ActiveDate;
	activeDays: DayType[];
	activeMonthId: string | null;
}

interface IState {
	track: ITracking;
}

export const Slice = createSlice({
	name: "track",
	initialState: {
		months: [],
		activeDate: {
			month: moment().format("YYYY-MM"),
			day: moment().format("YYYY-MM-DD"),
		},
		activeDays: [],
		activeMonthId: null,
	} as ITracking,
	reducers: {
		// Months reducers
		setMonths: (state, action: { payload: MonthType[] }) => {
			const mutableData = JSON.parse(JSON.stringify(action.payload));
			const months = mutableData.map((month: MonthType) => {
				month.entries = sortMonthEntries(month);
				return month;
			});
			state.months = months;
		},
		addMonthToMonths: (state, action: { payload: MonthType }) => {
			state.months.push(action.payload);
		},
		addEntryToMonths: (state, action: { payload: EntryType }) => {
			const month = state.months.find((m) => m.id === action.payload.monthId);
			month?.entries.push(action.payload);
		},
		updateEntryInMonths: (
			state,
			action: {
				payload: {
					id: string;
					description: string;
					amount: string;
					type: string;
				};
			}
		) => {
			const month = state.months.find((m) => m.date === state.activeDate.month);
			if (!month) return;

			const entry = month.entries.find((e) => e.id === action.payload.id);
			if (!entry) return;

			const idx = month.entries.findIndex((e) => e.id === entry.id);
			if (idx < 0) return;

			const updatedEntry = { ...entry, ...action.payload };
			month.entries.splice(idx, 1, updatedEntry);
		},
		removeEntryFromMonths: (state, action: { payload: EntryType }) => {
			const month = state.months.find((m) => m.id === action.payload.monthId);
			if (!month) return;
			const idx = month.entries.findIndex((e) => e.id === action.payload.id);
			month.entries.splice(idx, 1);
		},

		// Active month days reducers
		setActiveDays: (state, action: { payload: string }) => {
			const newActive = state.months.find((m) => m.date === action.payload);
			if (newActive) {
				state.activeDays = formatActiveMonthEntries(newActive.entries);
				state.activeMonthId = newActive.id;
			} else {
				state.activeDays = [];
				state.activeMonthId = null;
			}
		},
		updateActiveDays: (state, action: { payload: DayType[] }) => {
			state.activeDays = action.payload;
		},
		addEntryToActiveDays: (state, action: { payload: EntryType }) => {
			const date = moment(action.payload.timestamp).format("YYYY-MM-DD");
			const day = state.activeDays.find((d) => d.date === date);

			if (day) {
				day.entries.push(action.payload);
				return;
			}

			const newDay: DayType = {
				id: date,
				date: date,
				entries: [action.payload],
			};

			if (!state.activeDays.length) {
				state.activeDays.push(newDay);
				return;
			}

			for (const [idx, day] of state.activeDays.entries()) {
				const diff = moment(date).diff(moment(day.date), "milliseconds");

				if (diff > 0) {
					state.activeDays.splice(idx, 0, newDay);
					break;
				}

				if (idx === state.activeDays.length - 1) {
					state.activeDays.push(newDay);
					break;
				}
			}
		},
		updateEntryInActiveDays: (
			state,
			action: {
				payload: {
					id: string;
					description: string;
					amount: string;
					type: string;
					timestamp: string;
				};
			}
		) => {
			const day = state.activeDays.find(
				(d) => d.date === moment(action.payload.timestamp).format("YYYY-MM-DD")
			);
			if (!day) return;

			const entry = day.entries.find((e) => e.id === action.payload.id);
			if (!entry) return;

			const idx = day.entries.findIndex((e) => e.id === entry.id);
			if (idx < 0) return;

			const updatedEntry = { ...entry, ...action.payload };
			day.entries.splice(idx, 1, updatedEntry);
		},
		removeEntryFromActiveDays: (state, action: { payload: EntryType }) => {
			const date = moment(action.payload.timestamp).format("YYYY-MM-DD");
			const day = state.activeDays.find((day) => day.date === date);

			// Removes entry from day
			if (!day) return;
			day.entries = day.entries.filter((e) => e.id !== action.payload.id);

			// If day has no entries, remove it from the active month
			if (day.entries.length) return;
			const idx = state.activeDays.findIndex((d) => d.date === date);

			if (idx < 0) return;
			state.activeDays.splice(idx, 1);
		},

		// Active month reducers
		setActiveDate: (state, action: { payload: string }) => {
			const date = moment(action.payload);
			state.activeDate.day = date.format("YYYY-MM-DD");
			state.activeDate.month = date.format("YYYY-MM");

			const newActive = state.months.find(
				(month: MonthType) => month.date === date.format("YYYY-MM")
			);
			if (newActive) state.activeMonthId = newActive.id;
			else state.activeMonthId = null;
		},
	},
});

export const selectMonths = (state: IState) => state.track.months;
export const selectActiveDays = (state: IState) => state.track.activeDays;
export const selectActiveDate = (state: IState) => state.track.activeDate;
export const selectActiveMonthId = (state: IState) => state.track.activeMonthId;

export const {
	// Months reducers
	setMonths,
	addMonthToMonths,
	addEntryToMonths,
	updateEntryInMonths,
	removeEntryFromMonths,

	// Month days reducers
	setActiveDays,
	updateActiveDays,
	addEntryToActiveDays,
	updateEntryInActiveDays,
	removeEntryFromActiveDays,

	// Active month reducers
	setActiveDate,
} = Slice.actions;

export default Slice.reducer;

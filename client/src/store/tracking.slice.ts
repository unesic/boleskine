/**
 * Base
 */
import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

/**
 * Utilities & types
 */
import entries from "lib/data/entries";
import { formatEntries } from "lib/entriesFormatter";
import type { DayType } from "lib/SharedTypes";

export const Slice = createSlice({
	name: "tracking",
	initialState: {
		months: [],
		activeMonth: formatEntries(entries) as DayType[],
	},
	reducers: {
		setActiveMonth: (state, action) => {
			const newActiveMonth = state.months.find(
				(month: any) => month.date === action.payload
			);
			if (newActiveMonth) state.activeMonth = newActiveMonth;
		},
		addEntryToActiveMonth: (state, action) => {
			const date = moment(action.payload.timestamp).format("YYYY-MM-DD");
			const day = state.activeMonth.find((d) => d.date === date);
			if (day) {
				day.entries.push({
					...action.payload,
					id: moment().toISOString(),
					type: action.payload.type.value,
				});
			} else {
				const newDay = {
					id: date,
					date: date,
					entries: [
						{
							...action.payload,
							id: moment().toISOString(),
							type: action.payload.type.value,
						},
					],
				};

				state.activeMonth.push(newDay);
			}
		},
		removeEntryFromActiveMonth: (state, action) => {
			const date = moment(action.payload.timestamp).format("YYYY-MM-DD");
			const day = state.activeMonth.find((day) => day.date === date);
			if (!day) return;
			day.entries = day.entries.filter(
				(entry) => entry.id !== action.payload.id
			);
		},
		updateActiveMonth: (state, action) => {
			state.activeMonth = action.payload;
		},
	},
});

export const selectActiveMonth = (state: any) =>
	state.tracking.activeMonth as DayType[];
export const {
	setActiveMonth,
	addEntryToActiveMonth,
	removeEntryFromActiveMonth,
	updateActiveMonth,
} = Slice.actions;
export default Slice.reducer;

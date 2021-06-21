import { createSlice } from "@reduxjs/toolkit";
import { NotificationsType } from "lib/SharedTypes";

export const Slice = createSlice({
	name: "app",
	initialState: {
		notifications: [] as NotificationsType,
		targetEntryId: null as string | null,
	},
	reducers: {
		addNotification: (state, action) => {
			state.notifications.push(action.payload);
		},
		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter(
				(n) => n.id !== action.payload
			);
		},
		setTargetEntryId: (state, action) => {
			state.targetEntryId = action.payload;
		},
		clearTargetEntryId: (state, _) => {
			state.targetEntryId = null;
		},
	},
});

export const selectNotifications = (state: any) =>
	state.app.notifications as NotificationsType;

export const selectTargetEntryId = (state: any) =>
	state.app.targetEntryId as string;

export const {
	addNotification,
	removeNotification,
	setTargetEntryId,
	clearTargetEntryId,
} = Slice.actions;

export default Slice.reducer;

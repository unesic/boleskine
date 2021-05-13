import { createSlice } from "@reduxjs/toolkit";
import { NotificationsType } from "lib/SharedTypes";

export const Slice = createSlice({
	name: "app",
	initialState: {
		notifications: [] as NotificationsType,
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
	},
});

export const selectNotifications = (state: any) =>
	state.app.notifications as NotificationsType;

export const { addNotification, removeNotification } = Slice.actions;

export default Slice.reducer;

/**
 * Base
 */
import { createSlice } from "@reduxjs/toolkit";

/**
 * Types
 */
import { NotificationsType, NotificationType } from "lib/types/shared.types";

type PopupType = {
	visible: boolean;
	confirm: string | null;
	cancel: string | null;
	execute?: boolean | undefined;
	action: string;
};

interface IApp {
	notifications: NotificationsType;
	targetEntryId: string | null;
	popup: PopupType;
}

interface IState {
	app: IApp;
}

export const Slice = createSlice({
	name: "app",
	initialState: {
		notifications: [],
		targetEntryId: null,
		popup: {
			visible: false,
			confirm: null,
			cancel: null,
			execute: undefined,
			action: "",
		},
	} as IApp,
	reducers: {
		// Notification reducers
		addNotification: (
			state,
			action: { payload: NotificationType; type: string }
		) => {
			state.notifications.push(action.payload);
		},
		removeNotification: (state, action: { payload: string }) => {
			state.notifications = state.notifications.filter(
				(n) => n.id !== action.payload
			);
		},

		// Target entry id reducers
		setTargetEntryId: (state, action: { payload: string | null }) => {
			state.targetEntryId = action.payload;
		},
		clearTargetEntryId: (state) => {
			state.targetEntryId = null;
		},

		// Popup reducers
		setPopup: (state, action: { payload: PopupType }) => {
			state.popup = { ...action.payload };
		},
		closePopup: (state, action: { payload: boolean }) => {
			state.popup = {
				...state.popup,
				visible: false,
				execute: action.payload,
			};
		},
		clearPopup: (state) => {
			state.popup = {
				visible: false,
				confirm: null,
				cancel: null,
				execute: undefined,
				action: "",
			};
		},
	},
});

export const selectNotifications = (state: IState) => state.app.notifications;
export const selectTargetEntryId = (state: IState) => state.app.targetEntryId;
export const selectPopup = (state: IState) => state.app.popup;

export const {
	addNotification,
	removeNotification,
	setTargetEntryId,
	clearTargetEntryId,
	setPopup,
	closePopup,
	clearPopup,
} = Slice.actions;

export default Slice.reducer;

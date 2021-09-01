import { createSlice } from "@reduxjs/toolkit";
import { NotificationsType, NotificationType } from "lib/types/shared.types";

type PopupType = {
	visible: boolean;
	text: string | JSX.Element | null;
	confirm: string | null;
	cancel: string | null;
	execute?: boolean | undefined;
};

export const Slice = createSlice({
	name: "app",
	initialState: {
		notifications: [] as NotificationsType,
		targetEntryId: null as string | null,
		popup: {
			visible: false,
			text: null,
			confirm: null,
			cancel: null,
			execute: undefined,
		} as PopupType,
	},
	reducers: {
		addNotification: (
			state,
			action: { payload: NotificationType; type: string }
		) => {
			state.notifications.push(action.payload);
		},
		removeNotification: (state, action: { payload: string; type: string }) => {
			state.notifications = state.notifications.filter(
				(n) => n.id !== action.payload
			);
		},
		setTargetEntryId: (
			state,
			action: { payload: string | null; type: string }
		) => {
			state.targetEntryId = action.payload;
		},
		clearTargetEntryId: (state, _) => {
			state.targetEntryId = null;
		},
		setPopup: (state, action: { payload: PopupType; type: string }) => {
			state.popup = { ...action.payload };
		},
		closePopup: (state, action: { payload: boolean; type: string }) => {
			state.popup = {
				...state.popup,
				visible: false,
				execute: action.payload,
			};
		},
		clearPopup: (state, _) => {
			state.popup = {
				visible: false,
				text: null,
				confirm: null,
				cancel: null,
				execute: undefined,
			};
		},
	},
});

export const selectNotifications = (state: any) =>
	state.app.notifications as NotificationsType;

export const selectTargetEntryId = (state: any) =>
	state.app.targetEntryId as string;

export const selectPopup = (state: any) => state.app.popup as PopupType;

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

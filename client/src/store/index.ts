import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import appReducer from "./app.slice";
import authReducer from "./auth.slice";
import trackReducer from "./track.slice";

export const Store = configureStore({
	middleware: getDefaultMiddleware({
		serializableCheck: true,
	}),
	reducer: {
		app: appReducer,
		auth: authReducer,
		track: trackReducer,
	},
});

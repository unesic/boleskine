import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import appReducer from "./app.slice";
import authReducer from "./auth.slice";
import trackingReducer from "./tracking.slice";

export const Store = configureStore({
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
	reducer: {
		app: appReducer,
		auth: authReducer,
		tracking: trackingReducer,
	},
});

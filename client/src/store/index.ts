import { configureStore } from "@reduxjs/toolkit";

import trackingReducer from "./tracking.slice";
import authReducer from "./auth.slice";
import appReducer from "./app.slice";

export const Store = configureStore({
	reducer: {
		tracking: trackingReducer,
		auth: authReducer,
		app: appReducer,
	},
});

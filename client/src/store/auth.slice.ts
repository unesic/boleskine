/**
 * Base
 */
import { createSlice } from "@reduxjs/toolkit";

interface UserType {
	id?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	image?: string;
	language?: string;
	currency?: string;
	darkMode?: boolean;
}

interface SignInType extends UserType {
	token: string;
}

let user: UserType = {
	id: undefined,
};

interface IAuth {
	user: UserType;
}

interface IState {
	auth: IAuth;
}

export const Slice = createSlice({
	name: "auth",
	initialState: {
		user: user,
	} as IAuth,
	reducers: {
		// User reducers
		userSignIn: (state, action: { payload: SignInType }) => {
			state.user = { ...action.payload };
			localStorage.setItem("auth-token", action.payload.token);
		},
		userSignOut: (state) => {
			state.user = {
				id: undefined,
			};
			localStorage.removeItem("auth-token");
		},

		// Language reducers
		setLanguage: (state, action: { payload: string }) => {
			state.user.language = action.payload;
		},

		// Currency reducers
		setCurrency: (state, action: { payload: string }) => {
			state.user.currency = action.payload;
		},

		// Mode reducers
		setDarkMode: (state, action: { payload: boolean }) => {
			state.user.darkMode = action.payload;
		},
	},
});

export const selectUser = (state: IState) => state.auth.user;
export const selectLanguage = (state: IState) => state.auth.user.language;
export const selectCurrency = (state: IState) => state.auth.user.currency;
export const selectDarkMode = (state: IState) => state.auth.user.darkMode;

export const {
	userSignIn,
	userSignOut,
	setLanguage,
	setCurrency,
	setDarkMode,
} = Slice.actions;

export default Slice.reducer;

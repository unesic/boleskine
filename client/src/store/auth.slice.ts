/**
 * Base
 */
import { createSlice } from "@reduxjs/toolkit";

interface UserType {
	id?: string;
	email?: string;
	firstName: string;
	lastName: string;
	image: string;
	language?: string;
	currency?: string;
	darkMode?: boolean;
}

interface SignInType extends UserType {
	token: string;
}

const initialUserData: UserType = {
	id: undefined,
	darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
	firstName: "",
	lastName: "",
	image: "",
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
		user: initialUserData,
	} as IAuth,
	reducers: {
		// User reducers
		setUser: (state, action: { payload: UserType }) => {
			state.user = { ...action.payload };
		},
		userSignIn: (state, action: { payload: SignInType }) => {
			state.user = { ...action.payload };
			localStorage.setItem("auth-token", action.payload.token);
		},
		userSignOut: (state) => {
			state.user = { ...initialUserData };
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
	setUser,
	userSignIn,
	userSignOut,
	setLanguage,
	setCurrency,
	setDarkMode,
} = Slice.actions;

export default Slice.reducer;

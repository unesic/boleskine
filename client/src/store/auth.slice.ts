/**
 * Base
 */
import { createSlice } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface UserType extends JwtPayload {
	id?: string;
	firstName?: string;
	lastName?: string;
	image?: string;
	email?: string;
}

interface SignInType extends UserType {
	token: string;
}

let user: UserType | null = null;

if (localStorage.getItem("auth-token")) {
	const decoded: JwtPayload = jwtDecode(localStorage.getItem("auth-token")!);

	if (decoded.exp! * 1000 < Date.now()) {
		localStorage.removeItem("auth-token");
	} else {
		user = decoded;
	}
}

interface IAuth {
	user: UserType | null;
	language: string;
}

interface IState {
	auth: IAuth;
}

export const Slice = createSlice({
	name: "auth",
	initialState: {
		user: user,
		language: "en",
	} as IAuth,
	reducers: {
		// User reducers
		userSignIn: (state, action: { payload: SignInType }) => {
			state.user = action.payload;
			localStorage.setItem("auth-token", action.payload.token);
		},
		userSignOut: (state) => {
			state.user = null;
			localStorage.removeItem("auth-token");
		},

		// Language reducers
		setLanguage: (state, action: { payload: string }) => {
			state.language = action.payload;
		},
	},
});

export const selectUser = (state: IState) => state.auth.user;
export const selectLanguage = (state: IState) => state.auth.language;

export const { userSignIn, userSignOut, setLanguage } = Slice.actions;

export default Slice.reducer;

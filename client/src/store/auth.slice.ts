import { createSlice } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface UserType extends JwtPayload {
	id?: string;
	firstName?: string;
	lastName?: string;
	image?: string;
	email?: string;
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

export const Slice = createSlice({
	name: "auth",
	initialState: {
		user: user,
		language: "en",
	},
	reducers: {
		userSignIn: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("auth-token", action.payload.token);
		},
		userSignOut: (state) => {
			state.user = null;
			localStorage.removeItem("auth-token");
		},
		setLanguage: (state, action) => {
			state.language = action.payload;
		},
	},
});

export const selectUser = (state: any) => state.auth.user as UserType;
export const selectLanguage = (state: any) => state.auth.language as string;
export const { userSignIn, userSignOut, setLanguage } = Slice.actions;
export default Slice.reducer;

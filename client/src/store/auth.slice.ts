import { createSlice } from "@reduxjs/toolkit";
import jwtDecode, { JwtPayload } from "jwt-decode";

let user = null;

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
	},
	reducers: {
		userLogin: (state, action) => {
			console.log(action.payload);

			state.user = action.payload;
			localStorage.setItem("auth-token", action.payload.token);
		},
		userLogout: (state) => {
			console.log("logoutUser called");

			state.user = null;
			localStorage.removeItem("auth-token");
		},
	},
});

export const selectUser = (state: any) => state.auth.user;
export const { userLogin, userLogout } = Slice.actions;
export default Slice.reducer;

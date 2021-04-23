import { User } from "./index";

export const initialState = {
	user: null,
	loading: true,
	loginUser: (data: User) => {},
	logoutUser: () => {},
};

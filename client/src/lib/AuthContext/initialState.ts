import { User } from "./index";

export const initialState = {
	user: null as any,
	loading: true,
	loginUser: (data: User) => {},
	logoutUser: () => {},
};

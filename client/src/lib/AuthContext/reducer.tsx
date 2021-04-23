import { User } from "./index";

type InitialState = {
	user: User;
	loading: boolean;
};

type Action =
	| { type: "LOGIN"; payload: any }
	| { type: "SET_LOADING"; payload: boolean }
	| { type: "LOGOUT" };

export const reducer = (state: InitialState, action: Action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				user: action.payload,
			};
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};
		case "LOGOUT":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

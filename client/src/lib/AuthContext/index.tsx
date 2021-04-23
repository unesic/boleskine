import { createContext, useReducer } from "react";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { initialState as contextState } from "./initialState";
import { reducer } from "./reducer";

export type User = {
	id: string;
	email: string;
	token: string;
};

const initialState: {
	user: JwtPayload | null;
	loading: boolean;
} = { user: null, loading: true };

if (localStorage.getItem("auth-token")) {
	const decoded: JwtPayload = jwtDecode(localStorage.getItem("auth-token")!);

	if (decoded.exp! * 1000 < Date.now()) {
		localStorage.removeItem("auth-token");
	} else {
		initialState.user = decoded;
	}
}

const AuthContext = createContext(contextState);

interface AuthProviderProps {}

const AuthProvider: React.FC<AuthProviderProps> = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const loginUser = async (userData: User) => {
		dispatch({
			type: "LOGIN",
			payload: userData,
		});

		localStorage.setItem("auth-token", userData.token);
	};

	const logoutUser = () => {
		dispatch({
			type: "LOGOUT",
		});

		localStorage.removeItem("auth-token");
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				loginUser,
				logoutUser,
			}}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };

/**
 * Base
 */
import { createContext, useState } from "react";

type PopupContextState = {
	popupContent: JSX.Element | string | null;
	setPopupContent: React.Dispatch<
		React.SetStateAction<JSX.Element | string | null>
	>;
};

const initialValues: PopupContextState = {
	popupContent: null,
	setPopupContent: () => {},
};

export const PopupContext = createContext<PopupContextState>(initialValues);

export const PopupContextProvider: React.FC = ({ children }) => {
	const [content, setContent] = useState<JSX.Element | string | null>(null);
	return (
		<PopupContext.Provider
			value={{ popupContent: content, setPopupContent: setContent }}
		>
			{children}
		</PopupContext.Provider>
	);
};

/**
 * Base
 */
import { createContext, useState } from "react";

type ContentType = JSX.Element | string | null;

type PopupContextState = {
	popupContent: ContentType;
	setPopupContent: React.Dispatch<React.SetStateAction<ContentType>>;
};

const initialValues: PopupContextState = {
	popupContent: null,
	setPopupContent: () => {},
};

export const PopupContext = createContext<PopupContextState>(initialValues);

export const PopupContextProvider: React.FC = ({ children }) => {
	const [popupContent, setPopupContent] = useState<ContentType>(null);

	return (
		<PopupContext.Provider value={{ popupContent, setPopupContent }}>
			{children}
		</PopupContext.Provider>
	);
};

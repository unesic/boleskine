import { useCallback, useState } from "react";

export const useToggle = (initialValue = false): [boolean, () => void] => {
	const [state, setState] = useState(initialValue);

	const toggleState = useCallback(() => {
		setState(!state);
	}, [state]);

	return [state, toggleState];
};

import React, { useState, useRef, useEffect } from "react";

export const useVisible = (
	initialIsVisible: boolean
): [
	ref: React.RefObject<HTMLElement>,
	isVisible: boolean,
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
] => {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef<HTMLElement>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (ref.current && !ref.current.contains(e.target as Node)) {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	return [ref, isVisible, setIsVisible];
};

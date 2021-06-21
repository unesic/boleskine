import { useState, useRef, useEffect } from "react";

export const useVisible = (
	initialIsVisible: boolean,
	additional: any = true
): [
	ref: React.RefObject<HTMLDivElement>,
	isVisible: boolean,
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
] => {
	const [isVisible, setIsVisible] = useState(initialIsVisible);
	const ref = useRef<HTMLDivElement>(null);

	const handleClickOutside = (e: MouseEvent) => {
		if (!ref.current?.contains(e.target as Node) && additional?.(e.target)) {
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

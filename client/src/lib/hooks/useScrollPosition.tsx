import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollPosition = () => {
	const [position, setPosition] = useState<number | null>(null);
	const parentRef = useRef<HTMLDivElement>(null);
	const childRef = useRef<HTMLDivElement>(null);

	const handleScroll = useCallback(() => {
		if (!childRef.current) return;
		const { y } = childRef.current.getBoundingClientRect();
		setPosition(y);
	}, []);

	useEffect(() => {
		parentRef.current?.addEventListener("scroll", handleScroll, true);
		return () => {
			parentRef.current?.removeEventListener("scroll", handleScroll, true);
		};
	}, []);

	return [parentRef, childRef, position];
};

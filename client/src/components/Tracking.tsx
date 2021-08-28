/**
 * Base
 */
import { memo, useEffect, useRef, useState } from "react";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectTargetEntryId } from "store/app.slice";
import { selectActiveMonthDays } from "store/tracking.slice";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Day } from "components/Day";

interface TrackingProps {}

export const Tracking: React.FC<TrackingProps> = memo(() => {
	const [hasScroll, setHasScroll] = useState(false);
	const [scrollDisabled, setScrollDisabled] = useState(false);
	const wrapRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const trackRef = useRef() as React.MutableRefObject<HTMLDivElement>;

	const activeMonthDays = useSelector(selectActiveMonthDays);
	const targetEntryId = useSelector(selectTargetEntryId);

	useEffect(() => {
		const { scrollHeight: trackH } = trackRef.current;
		const { scrollHeight: wrapH } = wrapRef.current;
		setHasScroll(trackH > wrapH);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeMonthDays]);

	useEffect(() => {
		const newScrollDisabled = !!targetEntryId;
		setScrollDisabled(newScrollDisabled);
	}, [targetEntryId]);

	return (
		<Card className="h-full">
			<Header title="Tracking" />
			<div ref={wrapRef} className="Tracking">
				<div
					ref={trackRef}
					className={`Tracking__inner FancyScroll ${
						hasScroll ? "Tracking__inner--has-scroll" : ""
					} ${scrollDisabled ? "Tracking__inner--scroll-disabled" : ""}`.trim()}
				>
					{activeMonthDays.map((day) => (
						<Day key={day.id} {...day} />
					))}
				</div>
			</div>
		</Card>
	);
});

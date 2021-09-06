/**
 * Base
 */
import { memo, useEffect, useRef, useState } from "react";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectTargetEntryId } from "store/app.slice";
import { selectActiveDays } from "store/track.slice";

/**
 * Components & Utilities
 */
import { Card, Header } from "ui/card";
import { Day } from "components/Day";
import { useTranslation } from "lib/hooks/useTranslation";

interface TrackingProps {}

export const Tracking: React.FC<TrackingProps> = memo(() => {
	const [hasScroll, setHasScroll] = useState(false);
	const [scrollDisabled, setScrollDisabled] = useState(false);
	const wrapRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const trackRef = useRef() as React.MutableRefObject<HTMLDivElement>;

	const _t = useTranslation("app");
	const activeDays = useSelector(selectActiveDays);
	const targetEntryId = useSelector(selectTargetEntryId);

	useEffect(() => {
		const { scrollHeight: trackH } = trackRef.current;
		const { scrollHeight: wrapH } = wrapRef.current;
		setHasScroll(trackH > wrapH);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeDays]);

	useEffect(() => {
		const newScrollDisabled = !!targetEntryId;
		setScrollDisabled(newScrollDisabled);
	}, [targetEntryId]);

	return (
		<Card className="h-full">
			<Header title={_t.tracking.card_title} />
			<div ref={wrapRef} className="Tracking">
				<div
					ref={trackRef}
					className={`Tracking__inner FancyScroll ${
						hasScroll ? "Tracking__inner--has-scroll" : ""
					} ${scrollDisabled ? "Tracking__inner--scroll-disabled" : ""}`.trim()}
				>
					{activeDays.length ? (
						activeDays.map((day) => <Day key={day.id} {...day} />)
					) : (
						<p className="Tracking__no-entries">
							No entries added for this month yet.
						</p>
					)}
				</div>
			</div>
		</Card>
	);
});

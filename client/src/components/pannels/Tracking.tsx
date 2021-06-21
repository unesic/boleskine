/**
 * Base
 */
import { memo, useEffect, useRef, useState } from "react";

/**
 * Types
 */
import type { TrackingType } from "lib/SharedTypes";

/**
 * Components
 */
import { DraggableCard, Header } from "ui/card";
import { Day } from "./Days.lib/Day";
import { useSelector } from "react-redux";
import { selectTargetEntryId } from "store/app.slice";

interface TrackingProps {
	id: string;
	idx: number;
	days: TrackingType;
}

export const Tracking: React.FC<TrackingProps> = memo(({ id, idx, days }) => {
	const [hasScroll, setHasScroll] = useState(false);
	const [scrollDisabled, setScrollDisabled] = useState(false);
	const wrapRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const trackRef = useRef() as React.MutableRefObject<HTMLDivElement>;

	const targetEntryId = useSelector(selectTargetEntryId);

	useEffect(() => {
		const { scrollHeight: trackH } = trackRef.current;
		const { scrollHeight: wrapH } = wrapRef.current;
		setHasScroll(trackH > wrapH);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [days]);

	useEffect(() => {
		const newScrollDisabled = !!targetEntryId;
		setScrollDisabled(newScrollDisabled);
	}, [targetEntryId]);

	return (
		<DraggableCard
			draggableId={id}
			index={idx}
			className="col-span-5 px-2 h-full"
		>
			{(dragHandleProps) => (
				<>
					<Header title="Tracking" xMove dragHandleX={dragHandleProps} />
					<div ref={wrapRef} className="Tracking">
						<div
							ref={trackRef}
							className={`Tracking__inner ${
								hasScroll ? "Tracking__inner--has-scroll" : ""
							} ${
								scrollDisabled ? "Tracking__inner--scroll-disabled" : ""
							}`.trim()}
						>
							{days.map((day) => (
								<Day key={day.id} {...day} />
							))}
						</div>
					</div>
				</>
			)}
		</DraggableCard>
	);
});

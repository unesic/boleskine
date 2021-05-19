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

interface TrackingProps {
	id: string;
	idx: number;
	days: TrackingType;
}

export const Tracking: React.FC<TrackingProps> = memo(({ id, idx, days }) => {
	const [hasScrollbar, setHasScrollbar] = useState(false);
	const wrapRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const trackRef = useRef() as React.MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		setHasScrollbar(
			trackRef.current.scrollHeight > wrapRef.current.scrollHeight
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [days]);

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
								hasScrollbar ? "Tracking__inner--has-scroll" : ""
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

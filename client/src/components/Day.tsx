/**
 * Base
 */
import { memo, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Types & Utilities
 */
import { useMoment } from "lib/hooks/useMoment";
import type { EntriesType } from "lib/types/shared.types";

/**
 * Components
 */
import { Entries } from "components/Entries";

interface DayProps {
	id: string;
	date: string;
	entries: EntriesType;
}

export const Day: React.FC<DayProps> = memo(({ id, date, entries }) => {
	const [visible, setVisible] = useState(false);
	const ref = useRef() as React.RefObject<HTMLDivElement>;
	const moment = useMoment();

	useEffect(() => {
		setVisible(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<CSSTransition
			in={visible}
			timeout={300}
			classNames="Tracking__Day-"
			nodeRef={ref}
		>
			<div className="Tracking__Day" ref={ref}>
				<div className="Tracking__Day__Heading">
					{moment(date, "YYYY-MM-DD").format("ddd, ll")}
				</div>
				<Entries entries={entries} dayId={id} />
			</div>
		</CSSTransition>
	);
});

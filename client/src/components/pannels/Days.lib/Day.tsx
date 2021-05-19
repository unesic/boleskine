/**
 * Base
 */
import { memo, useEffect, useRef, useState } from "react";
import moment from "moment";

/**
 * Types
 */
import type { EntriesType } from "lib/SharedTypes";

/**
 * Components
 */
import { Entries } from "./Entries";
import { CSSTransition } from "react-transition-group";

interface DayProps {
	id: string;
	date: string;
	entries: EntriesType;
}

export const Day: React.FC<DayProps> = memo(({ id, date, entries }) => {
	const [visible, setVisible] = useState(false);
	const ref = useRef() as React.RefObject<HTMLDivElement>;

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
					{moment(date).format("ddd DD MMMM[,] YYYY")}
				</div>
				<Entries entries={entries} dayId={id} />
			</div>
		</CSSTransition>
	);
});

/**
 * Base
 */
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectTargetEntryId, setTargetEntryId } from "store/app.slice";

/**
 * Utilities
 */
import { useCurrencyFormatter } from "lib/hooks/utils/useFormat";

/**
 * Icons
 */
import { DotsVerticalIcon } from "@heroicons/react/outline";

interface EntryProps {
	id: string;
	timestamp: string;
	description: string;
	type: string;
	amount?: string | null;
}

export const Entry: React.FC<EntryProps> = memo(
	({ id, timestamp, description, type, amount }) => {
		const [hovering, setHovering] = useState(false);
		const [visible, setVisible] = useState(false);
		const transitionRef = useRef<HTMLDivElement>(null);
		const optionsRef = useRef<HTMLButtonElement>(null);
		const currencyFormatter = useCurrencyFormatter();

		const dispatch = useDispatch();
		const targetEntryId = useSelector(selectTargetEntryId);

		const optionsToggle = useCallback(() => {
			const newTargetEntryId = targetEntryId === id ? `-same-entry-${id}` : id;
			dispatch(setTargetEntryId(newTargetEntryId));
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [dispatch, targetEntryId]);

		useEffect(() => {
			setVisible(true);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<CSSTransition
				in={visible}
				timeout={300}
				classNames="Entries__Entry__Inner-"
				nodeRef={transitionRef}
			>
				<div
					onMouseEnter={() => setHovering(true)}
					onMouseLeave={() => setHovering(false)}
					className={`Entries__Entry ${
						hovering || targetEntryId === id ? "hover" : ""
					}`}
					id={id}
				>
					<div className="Entries__Entry__Inner" ref={transitionRef}>
						<p className="Entries__Entry__Text">{description}</p>

						{type !== "not" && amount ? (
							<p className={`Entries__Entry__Amount ${type}`}>
								{type === "inc" ? "+" : type === "exp" ? "-" : null}
								{currencyFormatter.format(parseFloat(amount))}
							</p>
						) : null}

						<button
							data-testid={`${description}-option`}
							ref={optionsRef}
							onClick={optionsToggle}
							className={`Option Option--${
								hovering || targetEntryId === id ? "visible" : "hidden"
							}`}
						>
							<DotsVerticalIcon />
						</button>
					</div>
				</div>
			</CSSTransition>
		);
	}
);

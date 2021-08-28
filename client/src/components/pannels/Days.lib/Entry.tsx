/**
 * Base
 */
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectTargetEntryId, setTargetEntryId } from "store/app.slice";

/**
 * Utilities
 */
import { currencyFormatter } from "lib/currency.utils";

/**
 * Icons
 */
import { DotsVerticalIcon, SwitchVerticalIcon } from "@heroicons/react/outline";
import { CSSTransition } from "react-transition-group";

interface EntryProps {
	id: string;
	timestamp: string;
	description: string;
	type: string;
	amount?: string | null;
	idx: number;
	draggingOver: boolean;
}

export const Entry: React.FC<EntryProps> = memo(
	({ id, timestamp, description, type, amount, idx, draggingOver }) => {
		const [hovering, setHovering] = useState(false);
		const [visible, setVisible] = useState(false);
		const transitionRef = useRef<HTMLDivElement>(null);
		const optionsRef = useRef<HTMLButtonElement>(null);

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

		const classes = useCallback(
			(isDragging: boolean) =>
				`Entries__Entry ${hovering ? "hover" : ""} ${
					isDragging ? "drag" : ""
				}`.trim(),
			[hovering]
		);

		return (
			<CSSTransition
				in={visible}
				timeout={300}
				classNames="Entries__Entry__Inner-"
				nodeRef={transitionRef}
			>
				<Draggable draggableId={id} index={idx}>
					{({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
						<div
							{...draggableProps}
							ref={innerRef}
							onMouseEnter={() => draggingOver || setHovering(true)}
							onMouseLeave={() => draggingOver || setHovering(false)}
							className={classes(isDragging)}
							id={id}
						>
							<div className="Entries__Entry__Inner" ref={transitionRef}>
								<button
									{...dragHandleProps}
									className={`Option Option--${
										hovering ? "visible" : "hidden"
									}`}
								>
									<SwitchVerticalIcon />
								</button>

								<p className="Entries__Entry__Text">{description}</p>

								{type !== "not" && amount ? (
									<p className={`Entries__Entry__Amount ${type}`}>
										{type === "inc" ? "+" : type === "exp" ? "-" : null}
										{currencyFormatter.format(parseFloat(amount))}
									</p>
								) : null}

								<button
									ref={optionsRef}
									onClick={optionsToggle}
									className={`Option Option--${
										hovering ? "visible" : "hidden"
									}`}
								>
									<DotsVerticalIcon />
								</button>
							</div>
						</div>
					)}
				</Draggable>
			</CSSTransition>
		);
	}
);

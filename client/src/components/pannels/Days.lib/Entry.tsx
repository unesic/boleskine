/**
 * Base
 */
import { memo, useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

/**
 * Utilities
 */
import { currencyFormatter } from "lib/currencyFormatter";

/**
 * Icons
 */
import { DotsVerticalIcon, SwitchVerticalIcon } from "@heroicons/react/outline";

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

		const classes = useCallback(
			(isDragging) =>
				`Entries__Entry ${hovering ? "hover" : ""} ${
					isDragging ? "drag" : ""
				}`.trim(),
			[hovering]
		);

		return (
			<Draggable draggableId={id} index={idx}>
				{({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
					<div
						{...draggableProps}
						ref={innerRef}
						onMouseEnter={() => draggingOver || setHovering(true)}
						onMouseLeave={() => draggingOver || setHovering(false)}
						className={classes(isDragging)}
					>
						<div className="Entries__Entry__Inner">
							<button
								{...dragHandleProps}
								className={`Option Option--${hovering ? "visible" : "hidden"}`}
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
								onClick={() => {}}
								className={`Option Option--${hovering ? "visible" : "hidden"}`}
							>
								<DotsVerticalIcon />
							</button>
						</div>
					</div>
				)}
			</Draggable>
		);
	}
);

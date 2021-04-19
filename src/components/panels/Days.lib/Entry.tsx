import { useCallback, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DotsVerticalIcon, SwitchVerticalIcon } from "@heroicons/react/outline";

export type EntryType = {
	id: string;
	text: string;
	type: string;
	amount?: string;
};

interface EntryProps {
	id: string;
	text: string;
	type: string;
	amount?: string;
	idx: number;
	draggingOver: boolean;
}

export const Entry: React.FC<EntryProps> = ({
	id,
	text,
	type,
	amount,
	idx,
	draggingOver,
}) => {
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

						<p className="Entries__Entry__Text">{text}</p>

						{type !== "not" && amount ? (
							<p className={`Entries__Entry__Amount ${type}`}>
								{type === "inc" ? "+" : type === "exp" ? "-" : null}
								{amount}
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
};

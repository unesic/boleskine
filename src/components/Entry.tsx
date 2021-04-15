import React, { useState } from "react";
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
}

export const Entry: React.FC<EntryProps> = ({ id, text, type, amount }) => {
	const [hovering, setHovering] = useState(false);

	return (
		<div
			className="Entries__Entry"
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<div className="Entries__Entry__Inner">
				<button
					className={`Option Option--${
						hovering ? "visible" : "hidden"
					}`}
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
					className={`Option Option--${
						hovering ? "visible" : "hidden"
					}`}
				>
					<DotsVerticalIcon />
				</button>
			</div>
		</div>
	);
};

import React from "react";

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
	return (
		<div className="Entries__Entry">
			<div className="Entries__Entry__Inner">
				<p className="Entries__Entry__Text">{text}</p>
				{type !== "not" && amount ? (
					<p className={`Entries__Entry__Amount ${type}`}>
						{type === "inc" ? "+" : type === "exp" ? "-" : null}
						{amount}
					</p>
				) : null}
			</div>
		</div>
	);
};

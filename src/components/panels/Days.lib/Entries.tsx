import React from "react";

import "assets/dist/components/Entries.css";
import { Entry, EntryType } from "./Entry";

export type EntriesType = EntryType[];

interface EntriesProps {
	entries: EntryType[];
}

export const Entries: React.FC<EntriesProps> = ({ entries }) => {
	return (
		<div className="Entries">
			{entries.map((entry) => (
				<Entry key={entry.id} {...entry} />
			))}
		</div>
	);
};

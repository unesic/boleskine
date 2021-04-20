import { useState } from "react";

import { DraggableCard, Header } from "ui/card";
import { InputSelect } from "ui/form/InputSelect";
import { InputText } from "ui/form/InputText";
import { Button } from "ui/misc/Button";

interface NewEntryProps {
	id: string;
	idx: number;
}

export const NewEntry: React.FC<NewEntryProps> = ({ id, idx }) => {
	const [select, setSelect] = useState("");
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");

	return (
		<DraggableCard
			draggableId={id}
			index={idx}
			className="col-span-4 px-2 h-max"
		>
			{(dragHandleProps) => (
				<>
					<Header title="Add new entry" xMove dragHandleX={dragHandleProps} />
					<InputText
						type="text"
						name="description"
						label="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<InputSelect
						name="entry_type"
						value={select}
						onChange={(e) => setSelect(e.target.value)}
						label="Entry type"
						options={[
							{ title: "Income", val: "0" },
							{ title: "Expense", val: "1" },
							{ title: "Note", val: "2" },
						]}
					/>
					<InputText
						type="number"
						name="amount"
						label="Amount"
						value={amount}
						onChange={(e) =>
							setAmount(
								e.target.value !== ""
									? parseFloat(e.target.value).toString()
									: ""
							)
						}
					/>
					<Button>Add new entry</Button>
				</>
			)}
		</DraggableCard>
	);
};

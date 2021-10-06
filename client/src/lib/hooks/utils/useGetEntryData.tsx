import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectActiveDate, selectMonths } from "store/track.slice";

export const useGetEntryData = (id: string | null) => {
	const months = useSelector(selectMonths);
	const activeDate = useSelector(selectActiveDate);

	const res = useMemo(() => {
		const month = months.find((m) => m.date === activeDate.month);
		if (!month) return undefined;

		const entry = month.entries.find((e) => e.id === id);
		if (!entry) return undefined;

		const { description, amount, type, timestamp } = entry;
		const entryType = {
			value: type,
			label: type === "inc" ? "Income" : type === "exp" ? "Expense" : "Note",
		};

		return {
			description: description,
			timestamp: timestamp,
			amount: amount as string,
			type: entryType,
		};
	}, [id, months, activeDate]);

	return res;
};

import moment from "moment";
import type { EntriesType } from "lib/SharedTypes";

const entries: EntriesType = [
	{
		id: "6092acfc9abcc94c92a938ea",
		timestamp: moment().subtract(2, "days").toISOString(),
		description: "Lorem ipsum dolor sit amet",
		type: "inc",
		amount: "42.00",
	},
	{
		id: "6092b0498d9b9d4e6cdf3f9c",
		timestamp: moment().subtract(2, "days").toISOString(),
		description: "Lorem ipsum dolor sit amet",
		type: "exp",
		amount: "25.00",
	},
	{
		id: "6092b06f8d9b9d4e6cdf3f9d",
		timestamp: moment().subtract(2, "days").toISOString(),
		description: "Lorem ipsum dolor sit amet",
		type: "not",
		amount: null,
	},
	{
		id: "6092acfc9abcc94c92a938eb",
		timestamp: moment().subtract(1, "day").toISOString(),
		description: "Lorem ipsum dolor sit amet",
		type: "inc",
		amount: "42.00",
	},
	{
		id: "6092b0498d9b9d4e6cdf3f9b",
		timestamp: moment().subtract(1, "day").toISOString(),
		description: "Lorem ipsum dolor sit amet",
		type: "exp",
		amount: "25.00",
	},
	{
		id: "6092b06f8d9b9d4e6cdf3f9c",
		timestamp: moment().subtract(1, "day").toISOString(),
		description: "Lorem ipsum dolor sit amet",
		type: "not",
		amount: null,
	},
];

export default entries;

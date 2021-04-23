import moment from "moment";

export const formatDate = (date: string[]): string => {
	return date.length === 1
		? moment(date[0]).format("MMMM[,] YYYY")
		: `${moment(date[0]).format("DD MMM")} - ${moment(date[1]).format(
				"DD MMM[,] YYYY"
		  )}`;
};

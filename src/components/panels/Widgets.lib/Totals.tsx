import React from "react";
import moment from "moment";

import "assets/dist/components/Totals.css";

interface TotalsProps {
	date: string[];
	income: number;
	expense: number;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const formatDate = (date: string[]): string => {
	return date.length === 1
		? moment(date[0]).format("MMMM[,] YYYY")
		: `${moment(date[0]).format("DD MMM")} - ${moment(date[1]).format(
				"DD MMM[,] YYYY"
		  )}`;
};

export const Totals: React.FC<TotalsProps> = ({ date, income, expense }) => {
	return (
		<div className="Totals">
			<p className="Totals__title">{formatDate(date)}</p>
			<div className="Totals__Inner">
				<div className="Total">
					<p className="Total__title Total__title--inc">
						TOTAL INCOME
					</p>
					<p className="Total__value">
						{currencyFormatter.format(income)}
					</p>
				</div>
				<div className="Total">
					<p className="Total__title Total__title--exp">
						TOTAL EXPENSE
					</p>
					<p className="Total__value">
						{currencyFormatter.format(expense)}
					</p>
				</div>
			</div>
		</div>
	);
};

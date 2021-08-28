/**
 * Base
 */
import { memo } from "react";

/**
 * Utilities
 */
import { formatMonth, formatWeek } from "lib/dateFormatter";
import { currencyFormatter } from "lib/currency.utils";

interface TotalsProps {
	date: string[];
	income: number;
	expense: number;
}

export const Totals: React.FC<TotalsProps> = memo(
	({ date, income, expense }) => {
		return (
			<div className="Totals">
				<p className="Totals__title">
					{Array.isArray(date) ? formatWeek(date) : formatMonth(date)}
				</p>
				<div className="Totals__Inner">
					<div className="Total">
						<p className="Total__title Total__title--inc">TOTAL INCOME</p>
						<p className="Total__value">{currencyFormatter.format(income)}</p>
					</div>
					<div className="Total">
						<p className="Total__title Total__title--exp">TOTAL EXPENSE</p>
						<p className="Total__value">{currencyFormatter.format(expense)}</p>
					</div>
				</div>
			</div>
		);
	}
);

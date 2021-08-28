/**
 * Base
 */
import { memo } from "react";

/**
 * Utilities
 */
import { currencyFormatter } from "lib/utils/format.utils";

interface TotalsProps {
	income: number;
	expense: number;
}

export const Totals: React.FC<TotalsProps> = memo(({ income, expense }) => {
	return (
		<div className="Totals">
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
});

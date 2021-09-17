/**
 * Base
 */
import { memo } from "react";

/**
 * Utilities
 */
import { useCurrencyFormatter } from "lib/utils/useFormat";
import { useTranslation } from "lib/hooks/useTranslation";

interface TotalsProps {
	income: number;
	expense: number;
}

export const Totals: React.FC<TotalsProps> = memo(({ income, expense }) => {
	const currencyFormatter = useCurrencyFormatter();
	const _t = useTranslation("app");

	return (
		<div className="Totals">
			<div className="Totals__Inner">
				<div className="Total">
					<p className="Total__title Total__title--inc">{_t.total_inc}</p>
					<p className="Total__value">{currencyFormatter.format(income)}</p>
				</div>
				<div className="Total">
					<p className="Total__title Total__title--exp">{_t.total_exp}</p>
					<p className="Total__value">{currencyFormatter.format(expense)}</p>
				</div>
			</div>
		</div>
	);
});

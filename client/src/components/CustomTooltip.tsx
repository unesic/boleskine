/**
 * Utils & Types
 */
import { formatLabel } from "lib/utils/analytics.utils";
import { currencyFormatter } from "lib/utils/format.utils";
import { TooltipProps } from "recharts";
import {
	NameType,
	ValueType,
} from "recharts/types/component/DefaultTooltipContent";

/**
 * Components
 */
import { Card } from "ui/card";

type CustomTooltipProps = TooltipProps<ValueType, NameType>;

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
	active,
	payload,
	label,
}) => {
	const inc = payload?.[0]?.value as string;
	const exp = payload?.[1]?.value as string;

	if (!inc && !exp) return null;

	return active ? (
		<Card>
			<div className="CustomTooltip">
				<p className="CustomTooltip__label">
					{formatLabel(label, "range", true, true)}
				</p>
				<p className="CustomTooltip__value">
					Income:{" "}
					<span className="CustomTooltip__value--inc">
						{currencyFormatter.format(parseInt(inc))}
					</span>
				</p>
				<p className="CustomTooltip__value">
					Expense:{" "}
					<span className="CustomTooltip__value--exp">
						{currencyFormatter.format(parseInt(exp))}
					</span>
				</p>
			</div>
		</Card>
	) : null;
};

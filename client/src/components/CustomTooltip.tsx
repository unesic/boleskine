/**
 * Utils & Types
 */
import { TooltipProps } from "recharts";
import {
	NameType,
	ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { useFormatLabel } from "lib/utils/useFormatLabel";
import { useCurrencyFormatter } from "lib/utils/useFormat";

/**
 * Components
 */
import { Card } from "ui/card";
import { useTranslation } from "lib/hooks/useTranslation";

type CustomTooltipProps = TooltipProps<ValueType, NameType>;

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
	active,
	payload,
	label,
}) => {
	const _t = useTranslation("app");
	const formatLabel = useFormatLabel();
	const currencyFormatter = useCurrencyFormatter();

	const inc = payload?.[0]?.value as string;
	const exp = payload?.[1]?.value as string;

	if (!inc && !exp) return null;

	return active ? (
		<Card className="bg-opacity-50">
			<div className="CustomTooltip">
				<p className="CustomTooltip__label">
					{formatLabel(label, "range", true)}
				</p>
				<p className="CustomTooltip__value">
					{_t.analytics.label.inc}{" "}
					<span className="CustomTooltip__value--inc">
						{currencyFormatter.format(parseInt(inc))}
					</span>
				</p>
				<p className="CustomTooltip__value">
					{_t.analytics.label.exp}{" "}
					<span className="CustomTooltip__value--exp">
						{currencyFormatter.format(parseInt(exp))}
					</span>
				</p>
			</div>
		</Card>
	) : null;
};

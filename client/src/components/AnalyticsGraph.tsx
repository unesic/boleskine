/**
 * Components
 */
import {
	ResponsiveContainer,
	AreaChart,
	Area,
	Tooltip,
	CartesianGrid,
	YAxis,
	XAxis,
} from "recharts";
import { CustomTooltip } from "components/CustomTooltip";

/**
 * Utils & Types
 */
import { useFormatLabel } from "lib/utils/useFormatLabel";
import { compactCurrency } from "lib/utils/format.utils";
import { TotalType } from "lib/types/analytics.types";

interface AnalyticsGraphProps {
	data: TotalType[] | null;
}

export const AnalyticsGraph: React.FC<AnalyticsGraphProps> = ({ data }) => {
	const formatLabel = useFormatLabel();

	if (!data) return null;

	return (
		<div className="">
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={data}>
					<defs>
						<linearGradient id="grad-inc" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#2276ff" stopOpacity={0.4} />
							<stop offset="75%" stopColor="#2276ff" stopOpacity={0.05} />
						</linearGradient>
						<linearGradient id="grad-exp" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#db2a34" stopOpacity={0.4} />
							<stop offset="75%" stopColor="#db2a34" stopOpacity={0.05} />
						</linearGradient>
					</defs>

					<Area dataKey="inc" stroke="#2276ff" fill="url(#grad-inc)" />
					<Area dataKey="exp" stroke="#db2a34" fill="url(#grad-exp)" />

					<YAxis
						dataKey="inc"
						axisLine={false}
						tickLine={false}
						tick={{ fill: "#f4f4f5", fontSize: "0.875rem" }}
						tickFormatter={(str) => compactCurrency.format(str)}
					/>
					<XAxis
						dataKey="key"
						axisLine={false}
						tickLine={false}
						tick={{ fill: "#f4f4f5", fontSize: "0.75rem" }}
						tickMargin={10}
						tickFormatter={(str) => formatLabel(str, "number", false)}
					/>

					<Tooltip content={<CustomTooltip />} />
					<CartesianGrid opacity={0.1} vertical={false} />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};

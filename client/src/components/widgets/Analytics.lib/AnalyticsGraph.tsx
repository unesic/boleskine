/**
 * Base
 */

import { memo, useEffect, useState, useMemo } from "react";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import {
	selectCurrency,
	selectDarkMode,
	selectLanguage,
} from "store/auth.slice";

/**
 * Utils & Types
 */
import { TotalType } from "lib/types/analytics.types";
import { useFormatLabel } from "lib/hooks/utils/useFormatLabel";
import { useCurrencyFormatter } from "lib/hooks/utils/useFormat";

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
import { CustomTooltip } from "./CustomTooltip";

interface AnalyticsGraphProps {
	data: TotalType[] | null;
}

export const AnalyticsGraph: React.FC<AnalyticsGraphProps> = memo(
	({ data }) => {
		const [mLeft, setMLeft] = useState(0);

		const formatLabel = useFormatLabel();
		const currencyFormatter = useCurrencyFormatter(true);

		const language = useSelector(selectLanguage);
		const currency = useSelector(selectCurrency);
		const darkMode = useSelector(selectDarkMode);

		useEffect(() => {
			if (language === "en" && currency === "EUR") {
				setMLeft(5);
			} else if (language === "en" && currency === "RSD") {
				setMLeft(30);
			} else if (language === "en" && currency === "USD") {
				setMLeft(5);
			} else if (language === "sr-Latn-RS" && currency === "EUR") {
				setMLeft(25);
			} else if (language === "sr-Latn-RS" && currency === "RSD") {
				setMLeft(45);
			} else if (language === "sr-Latn-RS" && currency === "USD") {
				setMLeft(40);
			}

			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [language, currency]);

		const YAxisKey = useMemo(() => {
			if (!data) return "inc";

			const { inc, exp } = data.reduce(
				(acc, curr) => ({ inc: acc.inc + curr.inc, exp: acc.exp + curr.exp }),
				{ inc: 0, exp: 0 }
			);

			return inc > exp ? "inc" : "exp";
		}, [data]);

		if (!data) return null;

		return (
			<div>
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart data={data} margin={{ left: mLeft }}>
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
							dataKey={YAxisKey}
							axisLine={false}
							tickLine={false}
							tick={{
								fill: darkMode ? "#f4f4f5" : "#00000B",
								fontSize: "0.875rem",
							}}
							tickFormatter={(str) => currencyFormatter.format(str)}
						/>
						<XAxis
							dataKey="key"
							axisLine={false}
							tickLine={false}
							tick={{
								fill: darkMode ? "#f4f4f5" : "#00000B",
								fontSize: "0.75rem",
							}}
							tickMargin={10}
							tickFormatter={(str) => formatLabel(str, "number", false)}
						/>

						<Tooltip content={<CustomTooltip />} />
						<CartesianGrid opacity={0.1} vertical={false} />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	}
);

/**
 * Base
 */
import { useEffect, useState } from "react";
import moment from "moment";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectMonths } from "store/tracking.slice";

/**
 * Components
 */
import { Card } from "ui/card";
import { Option, Select } from "ui/form/Select";
import { AnalyticsGraph } from "components/AnalyticsGraph";

/**
 * Utils
 */
import { getMasterData, splitDataYears } from "lib/utils/analytics.utils";
import { MasterDataType, Period } from "lib/types/analytics.types";
import { useMemo } from "react";

interface AnalyticsProps {}

export const Analytics: React.FC<AnalyticsProps> = () => {
	const months = useSelector(selectMonths);
	const [masterData, setMasterData] = useState<MasterDataType | null>(null);
	const [activeYear, setActiveYear] = useState<Option>({
		value: moment().year().toString(),
		label: moment().year().toString(),
	});
	const [activeTab, setActiveTab] = useState<Option>({
		value: "wow",
		label: "Week over Week",
	});

	useEffect(() => {
		if (!months.length) return;
		const splitData = splitDataYears(months);
		const newMasterData = getMasterData(splitData);

		setMasterData(newMasterData);
	}, [months]);

	const options = useMemo(
		() => [
			{
				value: "wow",
				label: "Week over Week",
			},
			{
				value: "mom",
				label: "Month over Month",
			},
			{
				value: "qoq",
				label: "Quarter over Quarter",
			},
		],
		[]
	);

	return masterData !== null ? (
		<Card className="max-h-full">
			<div className="AnalyticsChart">
				<div className="flex items-center justify-center gap-[0.5rem] mb-6">
					<div
						style={{ flex: "0 0 auto" }}
						className="text-xl text-app-light-100 text-center"
					>
						Display
					</div>
					<div style={{ flex: "0 0 20%" }}>
						<Select
							options={options}
							value={activeTab}
							onChange={(o) => setActiveTab(o as Option)}
							onBlur={() => {}}
							errors={undefined}
							touched={false}
							placeholder="Select one..."
						/>
					</div>
					<div
						style={{ flex: "0 0 auto" }}
						className="text-xl text-app-light-100 text-center"
					>
						progression for
					</div>
					<div style={{ flex: "0 0 20%" }}>
						<Select
							options={Object.keys(masterData).map((key) => ({
								value: key,
								label: key,
							}))}
							value={activeYear}
							onChange={(o) => setActiveYear(o as Option)}
							onBlur={() => {}}
							errors={undefined}
							touched={false}
							placeholder="Select one..."
						/>
					</div>
				</div>

				{Object.keys(masterData[activeYear.value]).map((key) => (
					<div key={key} className={activeTab.value !== key ? "hidden" : ""}>
						<AnalyticsGraph
							data={masterData[activeYear.value][key as Period]}
						/>
					</div>
				))}
			</div>
		</Card>
	) : null;
};

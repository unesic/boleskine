/**
 * Base
 */
import { useEffect, useState, useMemo, memo } from "react";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectMonths } from "store/track.slice";

/**
 * Components
 */
import { Card } from "ui/card";
import { Option, Select } from "ui/form/Select";
import { AnalyticsGraph } from "./Analytics.lib/AnalyticsGraph";

/**
 * Utils
 */
import { getMasterData, splitDataYears } from "lib/utils/analytics.utils";
import { MasterDataType, Period, Periods } from "lib/types/analytics.types";
import { useTranslation } from "lib/hooks/useTranslation";
import { useMoment } from "lib/hooks/useMoment";

interface AnalyticsProps {}

export const Analytics: React.FC<AnalyticsProps> = memo(() => {
	const _t = useTranslation("app");
	const moment = useMoment();
	const months = useSelector(selectMonths);

	const [masterData, setMasterData] = useState<MasterDataType | null>(null);
	const [activeYear, setActiveYear] = useState<Option>({
		value: moment().year().toString(),
		label: moment().year().toString(),
	});
	const [activeTab, setActiveTab] = useState<Option>({
		value: Periods.wow,
		label: _t.analytics.display.options.wow,
	});

	useEffect(() => {
		setActiveTab({
			value: Periods.wow,
			label: _t.analytics.display.options.wow,
		});
	}, [_t]);

	useEffect(() => {
		if (!months.length) return;
		const splitData = splitDataYears(months);
		const newMasterData = getMasterData(splitData);

		setMasterData(newMasterData);
	}, [months]);

	const tabsOptions = useMemo(
		() =>
			Object.entries(_t.analytics.display.options).map(([k, v]) => ({
				value: k as Period,
				label: v,
			})),
		[_t]
	);

	const yearOptions = useMemo(
		() =>
			masterData
				? Object.keys(masterData).map((key) => ({
						value: key,
						label: key,
				  }))
				: [],
		[masterData]
	);

	const graphData = useMemo(
		() => masterData?.[activeYear.value]?.[activeTab.value] || null,
		[masterData, activeYear, activeTab]
	);

	if (!masterData) return null;

	return (
		<Card className="max-h-full">
			<div className="AnalyticsChart">
				<div className="AnalyticsChart__Inner">
					<div className="AnalyticsChart__Inner__copy">
						{_t.analytics.display.copy}
					</div>

					<div className="AnalyticsChart__Inner__dropdown">
						<Select
							options={tabsOptions}
							value={activeTab}
							onChange={(o) => setActiveTab(o as Option)}
						/>
					</div>

					<div className="AnalyticsChart__Inner__copy">
						{_t.analytics.display.prog}
					</div>

					<div className="AnalyticsChart__Inner__dropdown">
						<Select
							options={yearOptions}
							value={activeYear}
							onChange={(o) => setActiveYear(o as Option)}
						/>
					</div>
				</div>

				<AnalyticsGraph data={graphData} />
			</div>
		</Card>
	);
});

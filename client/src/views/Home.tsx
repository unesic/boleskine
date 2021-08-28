/**
 * Base
 */
import { memo } from "react";

/**
 * Components
 */
import { NewEntry } from "components/NewEntry";
import { Tracking } from "components/Tracking";
import { Calendar } from "components/Calendar";
import { CurrentWeek } from "components/CurrentWeek";
import { CurrentMonth } from "components/CurrentMonth";
import { Analytics } from "components/Analytics";

interface HomeProps {}

export const Home: React.FC<HomeProps> = memo(() => {
	return (
		<>
			<div className="grid grid-cols-12 gap-4 mb-4">
				<div className="col-span-4 flex flex-col gap-4">
					<Calendar />
					<CurrentWeek />
					<CurrentMonth />
				</div>
				<div className="col-span-8 flex flex-col gap-4">
					<NewEntry />
					<Tracking />
				</div>
			</div>
			<Analytics />
		</>
	);
});

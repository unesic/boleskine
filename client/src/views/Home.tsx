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
			<div className="MainSection">
				<div className="MainSection__widgets">
					<Calendar />
					<CurrentWeek />
					<CurrentMonth />
				</div>
				<div className="MainSection__tracking">
					<NewEntry />
					<Tracking />
				</div>
			</div>
			<Analytics />
		</>
	);
});

/**
 * Base
 */
import { memo } from "react";

/**
 * Components
 */
import { User } from "components/widgets/User";
import { Calendar } from "components/widgets/Calendar";
import { CurrentMonth } from "components/widgets/CurrentMonth";
import { CurrentWeek } from "components/widgets/CurrentWeek";
import { NewEntry } from "components/widgets/NewEntry";
import { Tracking } from "components/widgets/Tracking";
import { Analytics } from "components/widgets/Analytics";

interface HomeProps {}

export const Home: React.FC<HomeProps> = memo(() => {
	return (
		<>
			<div className="MainSection">
				<div className="MainSection__widgets">
					<User />
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

export default Home;

/**
 * Base
 */
import { useEffect, useState } from "react";

interface CountdownProps {}

export const Countdown: React.FC<CountdownProps> = () => {
	const [timer, setTimer] = useState(5);

	useEffect(() => {
		const to = setTimeout(() => setTimer((prev) => prev - 1), 1000);
		return () => clearTimeout(to);
	}, [timer]);

	return (
		<div className="Countdown">
			<div className="Countdown__text">{timer}</div>
			<svg className="Countdown__spinner">
				<circle r="10" cx="12" cy="12" />
			</svg>
		</div>
	);
};

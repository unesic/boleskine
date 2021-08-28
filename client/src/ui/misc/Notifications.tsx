/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectNotifications } from "store/app.slice";

/**
 * Components
 */
import { Notification } from "ui/misc/Notification";

interface NotificationsProps {
	position: "tl" | "tr" | "bl" | "br";
}

export const Notifications: React.FC<NotificationsProps> = ({ position }) => {
	const notifications = useSelector(selectNotifications);

	return (
		<div
			className={`Notifications Notifications--${position} ${
				!notifications.length ? "Notifications--empty" : ""
			}`}
		>
			{notifications.map((notification) => (
				<Notification
					key={notification.id}
					notification={notification}
					pos={position}
				/>
			))}
		</div>
	);
};

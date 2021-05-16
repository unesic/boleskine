/**
 * Base
 */
import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Redux
 */
import { useDispatch } from "react-redux";
import { removeNotification } from "store/app.slice";

/**
 * Components & Types
 */
import { Countdown } from "./Countdown";
import type { NotificationType } from "lib/SharedTypes";

interface NotificationProps {
	notification: NotificationType;
	pos: "tl" | "tr" | "bl" | "br";
}

export const Notification: React.FC<NotificationProps> = ({
	notification,
	pos,
}) => {
	const [visible, setVisible] = useState(false);
	const firstLoad = useRef(true);
	const ref = useRef() as React.RefObject<HTMLDivElement>;
	const dispatch = useDispatch();

	useEffect(() => {
		setVisible(true);
		setTimeout(() => {
			setVisible(false);
		}, 5000);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!firstLoad.current) {
			if (!visible) {
				setTimeout(() => {
					dispatch(removeNotification(notification.id));
				}, 500);
			}
		} else {
			firstLoad.current = false;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	return (
		<CSSTransition
			in={visible}
			timeout={300}
			classNames={`Notification--${pos}-`}
			nodeRef={ref}
		>
			<div
				ref={ref}
				className={`Notification Notification--${pos} Notification--${notification.type}`}
			>
				<header className="Notification__title">{notification.title}</header>
				<p className="Notification__text">{notification.text}</p>
				<Countdown />
			</div>
		</CSSTransition>
	);
};

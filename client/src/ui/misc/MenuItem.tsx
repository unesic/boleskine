/**
 * Base
 */
import { useMemo, memo } from "react";

/**
 * Components
 */
import { Link } from "react-router-dom";

interface MenuItemProps {
	small?: boolean;
	big?: boolean;
	link?: boolean;
	to?: any;
	onClick?: () => void | null;
	clickable?: boolean;
	[key: string]: any;
}

export const MenuItem: React.FC<MenuItemProps> = memo(
	({
		small = false,
		big = false,
		link = false,
		to,
		onClick = null,
		clickable = true,
		children,
		...rest
	}) => {
		const classNames = useMemo(() => {
			const BASE = "User__Menu__item";
			const classes = [BASE];

			if (small) classes.push(`${BASE}--small`);
			if (big) classes.push(`${BASE}--big`);
			if (!clickable) classes.push(`${BASE}--no-click`);

			return classes.join(" ");
		}, [small, big, clickable]);

		const wrapper = useMemo(() => {
			if (link) return "link";
			if (!onClick) return "div";
			return "p";
		}, [link, onClick]);

		return wrapper === "link" ? (
			<Link to={to} {...rest} className={classNames}>
				{children}
			</Link>
		) : wrapper === "div" ? (
			<div className={classNames}>{children}</div>
		) : (
			<p className={classNames} onClick={onClick!}>
				{children}
			</p>
		);
	}
);

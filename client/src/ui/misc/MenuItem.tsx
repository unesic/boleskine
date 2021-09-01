import { Link } from "react-router-dom";

interface MenuItemProps {
	small?: boolean;
	big?: boolean;
	link?: boolean;
	to?: any;
	[key: string]: any;
}

export const MenuItem: React.FC<MenuItemProps> = ({
	small = false,
	big = false,
	link = false,
	to,
	children,
	...rest
}) => {
	return !link ? (
		<p
			className={`User__Menu__item ${
				small || big
					? `User__Menu__item--${small ? "small" : big ? "big" : ""}`
					: ""
			}`}
		>
			{children}
		</p>
	) : (
		<Link className="User__Menu__item" to={to} {...rest}>
			{children}
		</Link>
	);
};

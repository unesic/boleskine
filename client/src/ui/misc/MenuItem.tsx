import { Link } from "react-router-dom";

interface MenuItemProps {
	small?: boolean;
	big?: boolean;
	link?: boolean;
	to?: any;
	onClick?: () => void | null;
	[key: string]: any;
}

export const MenuItem: React.FC<MenuItemProps> = ({
	small = false,
	big = false,
	link = false,
	to,
	onClick = null,
	children,
	...rest
}) => {
	return !link ? (
		!onClick ? (
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
			<p onClick={onClick} className="User__Menu__item">
				{children}
			</p>
		)
	) : (
		<Link to={to} {...rest} className="User__Menu__item">
			{children}
		</Link>
	);
};

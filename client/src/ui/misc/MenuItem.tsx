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

export const MenuItem: React.FC<MenuItemProps> = ({
	small = false,
	big = false,
	link = false,
	to,
	onClick = null,
	clickable = true,
	children,
	...rest
}) => {
	return !link ? (
		!onClick ? (
			<div
				className={`User__Menu__item ${
					small || big
						? `User__Menu__item--${small ? "small" : big ? "big" : ""}`
						: ""
				} "User__Menu__item--${clickable ? "clickable" : "not-clickable"}`}
			>
				{children}
			</div>
		) : (
			<p
				onClick={onClick}
				className={`User__Menu__item  "User__Menu__item--${
					clickable ? "clickable" : "not-clickable"
				}`}
			>
				{children}
			</p>
		)
	) : (
		<Link
			to={to}
			{...rest}
			className={`User__Menu__item  "User__Menu__item--${
				clickable ? "clickable" : "not-clickable"
			}`}
		>
			{children}
		</Link>
	);
};

interface LabelProps {}

export const MenuItemLabel: React.FC<LabelProps> = ({ children }) => {
	return <span className="label">{children}</span>;
};

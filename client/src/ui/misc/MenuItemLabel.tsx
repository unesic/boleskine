interface MenuItemLabelProps {}

export const MenuItemLabel: React.FC<MenuItemLabelProps> = ({ children }) => {
	return <span className="label">{children}</span>;
};

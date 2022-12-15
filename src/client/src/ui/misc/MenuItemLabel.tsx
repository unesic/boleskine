/**
 * Base
 */
import { memo } from "react";

interface MenuItemLabelProps {}

export const MenuItemLabel: React.FC<MenuItemLabelProps> = memo(
	({ children }) => {
		return <span className="label">{children}</span>;
	}
);

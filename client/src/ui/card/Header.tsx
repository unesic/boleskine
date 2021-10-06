import { memo } from "react";

interface HeaderProps {
	title: string;
}

export const Header: React.FC<HeaderProps> = memo(({ title }) => {
	return (
		<div className="Card__Header">
			<div className="Card__Title">{title}</div>
		</div>
	);
});

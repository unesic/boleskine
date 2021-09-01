interface HeaderProps {
	title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
	return (
		<div className="Card__Header">
			<div className="Card__Title">{title}</div>
		</div>
	);
};

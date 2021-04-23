import {
	HiOutlineUser,
	HiOutlineChartSquareBar,
	HiOutlineLogout,
	HiOutlineCog,
	HiOutlineClipboardCheck,
	HiOutlineClipboardList,
} from "react-icons/hi";

import "assets/dist/components/Sidebar.css";
import { Link } from "react-router-dom";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
	return (
		<aside className="Sidebar">
			<Link to="/" className="Sidebar__User">
				<span className="Sidebar__User__image">
					<HiOutlineUser width={30} />
				</span>
				<span className="Sidebar__User__name">John Doe</span>
			</Link>

			<div className="Sidebar__Menu">
				<div className="Sidebar__Menu__title">BOLESKINE</div>
				<div className="Sidebar__Menu__Submenu">
					<Link to="/" className="Sidebar__Menu__Submenu__item">
						<HiOutlineClipboardCheck size={20} /> Tracking
					</Link>
					<Link to="/" className="Sidebar__Menu__Submenu__item">
						<HiOutlineClipboardList size={20} /> Planning
					</Link>
					<Link to="/" className="Sidebar__Menu__Submenu__item">
						<HiOutlineChartSquareBar size={20} /> Analytics
					</Link>
				</div>

				<div className="Sidebar__Menu__title">SETTINGS</div>
				<div className="Sidebar__Menu__Submenu">
					<Link to="/" className="Sidebar__Menu__Submenu__item">
						<HiOutlineLogout size={20} /> Settings &amp; Privacy
					</Link>
					<Link to="/" className="Sidebar__Menu__Submenu__item">
						<HiOutlineCog size={20} /> Help &amp; Support
					</Link>
					<Link to="/logout" className="Sidebar__Menu__Submenu__item">
						<HiOutlineLogout size={20} /> Log out
					</Link>
				</div>
			</div>

			<div className="Sidebar__Extra">
				<Link to="/" className="Sidebar__Extra__link">
					Privacy Policy
				</Link>
				<Link to="/" className="Sidebar__Extra__link">
					Terms of Use
				</Link>
				<Link to="/" className="Sidebar__Extra__link">
					Cookies
				</Link>
			</div>
		</aside>
	);
};

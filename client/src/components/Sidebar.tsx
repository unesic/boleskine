/**
 * Base
 */
import { memo } from "react";
import { Link } from "react-router-dom";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { userLogout, selectUser } from "store/auth.slice";

/**
 * Icons
 */
import {
	HiOutlineUser,
	HiOutlineChartSquareBar,
	HiOutlineLogout,
	HiOutlineCog,
	HiOutlineClipboardCheck,
	HiOutlineClipboardList,
} from "react-icons/hi";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = memo(() => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	return (
		<aside className="Sidebar">
			<Link to={`/u/${user.id}`} className="Sidebar__User">
				<span className="Sidebar__User__image">
					{user.image ? (
						<img
							src={user.image}
							alt={`${user.firstName} ${user.lastName}'s avatar`}
							referrerPolicy="no-referrer"
						/>
					) : (
						<HiOutlineUser width={30} />
					)}
				</span>
				<div className="Sidebar__User__Details">
					<div className="Sidebar__User__Details__name">{`${user.firstName} ${user.lastName}`}</div>
					<div className="Sidebar__User__Details__email">{user.email}</div>
				</div>
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
					<Link
						to="/logout"
						onClick={() => dispatch(userLogout())}
						className="Sidebar__Menu__Submenu__item"
					>
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
});

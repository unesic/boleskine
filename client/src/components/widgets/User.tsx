/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components – UI
 */
import { Card } from "ui/card";
import { MenuItem } from "ui/misc/MenuItem";
import { Spacer } from "ui/misc/Spacer";

/**
 * Components – Controls
 */
import { DarkModeControl } from "ui/controls/DarkModeControl";
import { LanguageControl } from "ui/controls/LanguageControl";
import { CurrencyControl } from "ui/controls/CurrencyControl";

/**
 * Icons
 */
import { BiLogOut } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";

interface UserProps {}

export const User: React.FC<UserProps> = () => {
	const _t = useTranslation("header");
	const user = useSelector(selectUser);

	if (!user.id) return null;

	return (
		<div className="Widget--User">
			<Card>
				<div className="User__Info">
					<img
						src={
							user.image ||
							`https://avatars.dicebear.com/api/identicon/${user.id}.svg`
						}
						alt={`${user.firstName} ${user.lastName}'s avatar`}
						referrerPolicy="no-referrer"
						className="User__Info__avatar"
					/>
					<div className="User__Info__details">
						<MenuItem big link to="/foo">
							{user.firstName} {user.lastName}
						</MenuItem>
						<MenuItem small>{user.email}</MenuItem>
					</div>
				</div>

				<div className="User__Menu">
					<Spacer direction="horizontal" />

					<DarkModeControl />
					<LanguageControl />
					<CurrencyControl />

					<Spacer direction="horizontal" />

					<MenuItem link to="/">
						<BsFillGearFill /> {_t.settings}
					</MenuItem>

					<MenuItem link to="/sign-out">
						<BiLogOut /> {_t.sign_out}
					</MenuItem>
				</div>
			</Card>
		</div>
	);
};

/**
 * Base
 */
import { memo, useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

/**
 * Utilities
 */
import { useVisible } from "lib/hooks/useVisible";
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { Spacer } from "ui/misc/Spacer";
import { MenuItem, MenuItemLabel } from "ui/misc/MenuItem";
import { ModeControl } from "ui/misc/ModeControl";
import { LanguageControl } from "ui/misc/LanguageControl";
import { CurrencyControl } from "ui/misc/CurrencyControl";

/**
 * Icons
 */
import { BsCaretDownFill, BsFillGearFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = memo(() => {
	const [menuRef, isVisible, setIsVisible] = useVisible(false);
	const cssRef = useRef() as React.RefObject<HTMLDivElement>;

	const user = useSelector(selectUser);

	const _t = useTranslation("header");

	const toggleMenu = useCallback(() => {
		setIsVisible(!isVisible);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	return (
		<header className="Topbar">
			<div className="Topbar__Inner">
				{user.id ? (
					<div className="Topbar__User" ref={menuRef}>
						<button className="User__Avatar" onClick={toggleMenu}>
							<img
								src={
									user.image ||
									`https://avatars.dicebear.com/api/identicon/${user.id}.svg`
								}
								alt={`${user.firstName} ${user.lastName}'s avatar`}
								referrerPolicy="no-referrer"
								className="User__Avatar__image"
							/>
							<BsCaretDownFill />
						</button>

						<CSSTransition
							in={isVisible}
							timeout={200}
							classNames="User__Menu-"
							nodeRef={cssRef}
							unmountOnExit
						>
							<div className="User__Menu" ref={cssRef}>
								<MenuItem big>
									<MenuItemLabel>{_t.user_copy}</MenuItemLabel>
									{user.firstName} {user.lastName}
								</MenuItem>

								<MenuItem small>{user.email}</MenuItem>

								<Spacer direction="horizontal" />

								<ModeControl />
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
						</CSSTransition>
					</div>
				) : null}
			</div>
		</header>
	);
});

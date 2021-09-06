/**
 * Base
 */
import { memo, useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectLanguage, selectUser, setLanguage } from "store/auth.slice";

/**
 * Utilities
 */
import { useVisible } from "lib/hooks/useVisible";
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Components
 */
import { BsCaretDownFill, BsFillGearFill } from "react-icons/bs";
import { MdLanguage } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { MenuItem } from "ui/misc/MenuItem";
import { Spacer } from "ui/misc/Spacer";

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = memo(() => {
	const [menuRef, isVisible, setIsVisible] = useVisible(false);
	const cssRef = useRef() as React.RefObject<HTMLDivElement>;

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const language = useSelector(selectLanguage);

	const _t = useTranslation("header");

	const toggleMenu = useCallback(() => {
		setIsVisible(!isVisible);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

	const switchLanguage = useCallback(() => {
		dispatch(setLanguage(language === "en" ? "sr-Latn-RS" : "en"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	return (
		<header className="Topbar">
			<div className="Topbar__Inner">
				{user ? (
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
									{_t.user_copy}{" "}
									<strong>
										{user.firstName} {user.lastName}
									</strong>
								</MenuItem>
								<MenuItem small>{user.email}</MenuItem>

								<Spacer direction="horizontal" />
								<MenuItem onClick={switchLanguage}>
									<MdLanguage /> {_t.language}
								</MenuItem>
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

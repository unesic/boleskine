/**
 * Base
 */
import { memo, useCallback, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { useVisible } from "lib/hooks/useVisible";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { userSignOut, selectUser } from "store/auth.slice";

/**
 * Components
 */
import { BsCaretDownFill } from "react-icons/bs";
import { MenuItem } from "ui/misc/MenuItem";
import { Spacer } from "ui/misc/Spacer";

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = memo(() => {
	const [menuRef, isVisible, setIsVisible] = useVisible(false);
	const cssRef = useRef() as React.RefObject<HTMLDivElement>;

	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const signOut = useCallback(() => {
		dispatch(userSignOut());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleMenu = useCallback(() => {
		setIsVisible(!isVisible);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isVisible]);

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
									Signed in as{" "}
									<strong>
										{user.firstName} {user.lastName}
									</strong>
								</MenuItem>
								<MenuItem small>{user.email}</MenuItem>

								<Spacer direction="horizontal" />

								<MenuItem link to="/sign-out" onClick={signOut}>
									Sign out
								</MenuItem>
							</div>
						</CSSTransition>
					</div>
				) : null}
			</div>
		</header>
	);
});

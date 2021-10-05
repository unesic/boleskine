/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";
import { useToggle } from "lib/hooks/useToggle";

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
import { BiCaretDownCircle, BiLogOut } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { useCallback, useContext, useEffect, useRef } from "react";
import { PopupContext } from "lib/PopupContext";
import { useProfileForm } from "lib/hooks/useProfileForm";
import { selectPopup, setPopup } from "store/app.slice";

enum PROFILE_ACTIONS {
	UPDATE = "UPDATE",
}

interface UserProps {}

export const User: React.FC<UserProps> = () => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { popupContent, setPopupContent } = useContext(PopupContext);

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const popup = useSelector(selectPopup);

	const _t = useTranslation("header");
	const [visible, toggleVisible] = useToggle(false);

	const profileData = {
		firstName: user.firstName,
		lastName: user.lastName,
		image: user.image,
	};

	useEffect(() => {
		const { execute, action } = popup;

		if (typeof execute === "undefined" || !execute) return;
		if (action !== PROFILE_ACTIONS.UPDATE || profileData === values) return;

		submitUpdate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popup]);

	const [
		ProfileForm,
		submitUpdate,
		values,
		errors,
		touched,
	] = useProfileForm(async (v) => {});

	useEffect(() => {
		if (!touched && !Object.keys(errors).length) return;
		setPopupContent(ProfileForm);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values, errors, touched]);

	const openProfilePopup = useCallback(() => {
		setPopupContent(ProfileForm);
		dispatch(
			setPopup({
				visible: true,
				title: "Edit profile info",
				confirm: "Update",
				cancel: "Discard",
				action: PROFILE_ACTIONS.UPDATE,
			})
		);
	}, []);

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

					<button
						className={`User__Info__toggle ${
							visible ? "User__Info__toggle--open" : ""
						}`}
						onClick={toggleVisible}
					>
						<BiCaretDownCircle size={24} />
					</button>
				</div>

				<div
					ref={menuRef}
					className="User__Menu"
					style={{
						maxHeight: visible
							? `${menuRef.current?.scrollHeight}px`
							: undefined,
					}}
				>
					<Spacer direction="horizontal" />

					<DarkModeControl />
					<LanguageControl />
					<CurrencyControl />

					<Spacer direction="horizontal" />

					<MenuItem link to="/">
						<BsFillGearFill /> {_t.settings}
					</MenuItem>

					<MenuItem onClick={openProfilePopup}>
						<BsFillGearFill /> Edit profile
					</MenuItem>

					<MenuItem link to="/sign-out">
						<BiLogOut /> {_t.sign_out}
					</MenuItem>
				</div>
			</Card>
		</div>
	);
};

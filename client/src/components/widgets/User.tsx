/**
 * Base
 */
import { useCallback, useContext, useEffect, useRef } from "react";

/**
 * Apollo
 */
import { useMutation } from "@apollo/client";
import { FILE_UPLOAD } from "lib/graphql/file.queries";
import { USER_UPDATE } from "lib/graphql/user.queries";

/**
 * Redux
 */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "store/auth.slice";
import { addNotification, selectPopup, setPopup } from "store/app.slice";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";
import { useProfileForm } from "lib/hooks/useProfileForm";
import { PopupContext } from "lib/PopupContext";
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
import { BiCaretDownCircle, BiLogOut, BiUser } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";

enum PROFILE_ACTIONS {
	UPDATE = "UPDATE",
}

interface UserProps {}

export const User: React.FC<UserProps> = () => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { setPopupContent } = useContext(PopupContext);
	const [imageFile, setImageFile] = useState<File | null>(null);

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const popup = useSelector(selectPopup);

	const _t = useTranslation("header");
	const _tNot = useTranslation("notifications");
	const [visible, toggleVisible] = useToggle(false);

	const profileData = {
		firstName: user.firstName,
		lastName: user.lastName,
		image: user.image,
	};

	const onProfileUpdate = useCallback(
		async (values: any) => {
			await updateUser({
				variables: {
					id: user.id,
					...values,
				},
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[user]
	);

	const [ProfileForm, formik] = useProfileForm(
		onProfileUpdate,
		setImageFile,
		profileData
	);

	useEffect(() => {
		const { execute, action } = popup;

		if (typeof execute === "undefined" || !execute) return;
		if (action !== PROFILE_ACTIONS.UPDATE || profileData === formik.values)
			return;

		if (!imageFile) formik.submitForm();
		else singleUpload({ variables: { file: imageFile } });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [popup, imageFile]);

	useEffect(() => {
		if (!formik.touched && !Object.keys(formik.errors).length) return;
		setPopupContent(ProfileForm);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values, formik.errors, formik.touched]);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ProfileForm]);

	const [updateUser] = useMutation(USER_UPDATE, {
		onCompleted({ updateUser }) {
			dispatch(setUser(updateUser));
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: "Profile updated!",
					text: "You've successfully updated your profile information!",
					type: "success",
				})
			);
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.error.title,
					text: `${_tNot.error.text} '${err}'`,
					type: "error",
				})
			);
		},
	});

	const [singleUpload] = useMutation(FILE_UPLOAD, {
		onCompleted({ singleUpload }) {
			formik.setFieldValue("image", singleUpload.path);
			formik.submitForm();
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.error.title,
					text: `${_tNot.error.text} '${err}'`,
					type: "error",
				})
			);
		},
	});

	if (!user.id) return null;

	return (
		<div className="Widget--User">
			<Card>
				<div className="User__Info">
					<img
						src={
							user.image
								? user.image.includes("images/")
									? `${process.env.REACT_APP_SERVER_URL}/${user.image}`
									: user.image
								: `https://avatars.dicebear.com/api/identicon/${user.id}.svg`
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

					{/* <MenuItem link to="/">
						<BsFillGearFill /> {_t.settings}
					</MenuItem> */}

					<MenuItem onClick={openProfilePopup}>
						<BiUser /> Edit profile
					</MenuItem>

					<MenuItem link to="/sign-out">
						<BiLogOut /> {_t.sign_out}
					</MenuItem>
				</div>
			</Card>
		</div>
	);
};

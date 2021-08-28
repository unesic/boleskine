/**
 * Base
 */
import { memo, useCallback } from "react";
import { Link } from "react-router-dom";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { userSignOut, selectUser } from "store/auth.slice";
import { Spacer } from "ui/misc/Spacer";
import { MenuItem } from "./MenuItem";

interface TopbarProps {}

export const Topbar: React.FC<TopbarProps> = memo(() => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const signOut = useCallback(() => {
		dispatch(userSignOut());
	}, []);

	return (
		<header className="Topbar">
			{user ? (
				<div className="Topbar__User">
					<button className="User__Avatar">
						<img
							src={
								user.image ||
								`https://avatars.dicebear.com/api/identicon/${user.id}.svg`
							}
							alt={`${user.firstName} ${user.lastName}'s avatar`}
							referrerPolicy="no-referrer"
							className="User__Avatar__image"
						/>
					</button>

					<div className="User__Menu">
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
				</div>
			) : null}
		</header>
	);
});

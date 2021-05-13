/**
 * Base
 */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useLazyQuery } from "@apollo/client";

/**
 * Redux
 */
import { useSelector } from "react-redux";
import { selectUser } from "store/auth.slice";

/**
 * Utilities & types
 */
import { GET_USER } from "lib/graphql/user.queries";
import type { UserType } from "lib/SharedTypes";

/**
 * Components
 */
import { Card, Header } from "ui/card";
import { Caption } from "ui/form/Caption";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
	const [userProfile, setUserProfile] = useState<null | UserType>(null);

	const params = useParams<{ id: string } | null>();
	const user = useSelector(selectUser);

	useEffect(() => {
		if (params?.id === user.id) setUserProfile(user);
		else getUser({ variables: { userId: params?.id } });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.id]);

	const [getUser] = useLazyQuery(GET_USER, {
		onCompleted({ getUser }) {
			setUserProfile(getUser);
		},
		onError(err) {
			console.log(err);
		},
	});

	return userProfile ? (
		<div className="container mx-auto min-h-screen grid place-items-center">
			<div className="min-w-min">
				<Card>
					<Header title="User profile" noSettings noClose />
					<div className="flex gap-4 items-center p-2">
						<div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
							<img
								src={userProfile.image}
								alt={`${userProfile.firstName} ${userProfile.lastName}'s avatar`}
								className="w-full h-full"
							/>
						</div>
						<div className="w-full">
							<div className="text-xl font-body-medium text-app-light-100">
								{userProfile.firstName} {userProfile.lastName}
							</div>
							<div className="text-app-light-200">
								{userProfile.email}
							</div>
							<Caption className="mt-1 text-sm opacity-60">User ID</Caption>
							<p className="text-sm text-app-light-300">
								{userProfile.id}
							</p>
						</div>
					</div>
				</Card>
			</div>
		</div>
	) : null;
};

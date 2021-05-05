import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import { AuthContext, User } from "lib/AuthContext";
import { Card, Header } from "ui/card";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "lib/graphql/user.queries";
import { Caption } from "ui/form/Caption";

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = () => {
	const [user, setUser] = useState<null | User>(null);
	const context = useContext(AuthContext);
	const params = useParams<{ id: string } | null>();

	useEffect(() => {
		if (params?.id === context.user.id) setUser(context.user);
		else getUser({ variables: { userId: params?.id } });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?.id]);

	const [getUser] = useLazyQuery(GET_USER, {
		onCompleted({ getUser }) {
			setUser(getUser);
		},
		onError(err) {
			console.log(err);
		},
	});

	return user ? (
		<div className="container mx-auto min-h-screen grid place-items-center">
			<div className="min-w-min">
				<Card>
					<Header title="User profile" noSettings noClose />
					<div className="flex gap-4 items-center p-2">
						<div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
							<img
								src={user.image}
								alt={`${user.firstName} ${user.lastName}'s avatar`}
								className="w-full h-full"
							/>
						</div>
						<div className="w-full">
							<div className="text-xl font-body-medium text-app-light-primary">
								{user.firstName} {user.lastName}
							</div>
							<div className="text-app-light-secondary">{user.email}</div>
							<Caption className="mt-1 text-sm opacity-60">User ID</Caption>
							<p className="text-sm text-app-light-tertiary">{user.id}</p>
						</div>
					</div>
				</Card>
			</div>
		</div>
	) : null;
};

/**
 * Base
 */
import { memo, useEffect } from "react";
import { Router } from "Router";
import moment from "moment";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { setActiveMonthDays, setMonths } from "store/tracking.slice";
import { selectUser } from "store/auth.slice";

/**
 * Apollo
 */
import { useLazyQuery } from "@apollo/client";
import { GET_USER_MONTHS } from "lib/graphql/month.queries";

interface AppProps {}

export const App: React.FC<AppProps> = memo(() => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		if (!user) return;
		getUserMonths();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const [getUserMonths] = useLazyQuery(GET_USER_MONTHS, {
		onCompleted({ getUserMonths }) {
			const initialDate = moment().format("YYYY-MM");
			dispatch(setMonths(getUserMonths));
			dispatch(setActiveMonthDays(initialDate));
		},
		onError(err) {
			console.log(err);
		},
	});

	return <Router />;
});

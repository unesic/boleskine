/**
 * Base
 */
import { memo, useEffect } from "react";
import { Router } from "Router";
// import moment from "moment";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { setActiveMonthDays, setMonths } from "store/tracking.slice";
import { selectUser, setLanguage } from "store/auth.slice";

/**
 * Apollo
 */
import { useLazyQuery } from "@apollo/client";
import { GET_USER_MONTHS } from "lib/graphql/month.queries";
import { useMoment } from "lib/hooks/useMoment";

interface AppProps {}

export const App: React.FC<AppProps> = memo(() => {
	const moment = useMoment();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	useEffect(() => {
		document.body.classList.add("FancyScroll");

		const navLang = navigator.language;
		const language = navLang === "sr" ? "sr-Latn-RS" : navLang;
		dispatch(setLanguage(language));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

/**
 * Base
 */
import { memo, useCallback, useEffect } from "react";
import { Router } from "Router";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import { setActiveDays, setMonths } from "store/track.slice";
import {
	selectDarkMode,
	selectUser,
	setLanguage,
	setDarkMode,
} from "store/auth.slice";
import { addNotification } from "store/app.slice";

/**
 * Apollo
 */
import { useLazyQuery } from "@apollo/client";
import { GET_USER_MONTHS } from "lib/graphql/month.queries";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";
import { useMoment } from "lib/hooks/useMoment";
import { PopupContextProvider } from "lib/PopupContext";

/**
 * Components
 */
import { Notifications } from "ui/misc/Notifications";
import { EntryOptions } from "ui/misc/EntryOptions";
import { ConfirmationPoup } from "ui/misc/ConfirmationPopup";

interface AppProps {}

export const App: React.FC<AppProps> = memo(() => {
	const moment = useMoment();
	const _t = useTranslation("notifications");

	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const darkMode = useSelector(selectDarkMode);

	useEffect(() => {
		document.body.classList.add("FancyScroll");

		const navLang = navigator.language;
		const is_sr = navLang === "sr";
		const is_en = navLang.includes("en");
		const language = is_sr ? "sr-Latn-RS" : is_en ? "en" : "en";
		dispatch(setLanguage(language));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!user.id) return;
		getUserMonths();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	useEffect(() => {
		if (darkMode) document.body.classList.add("dark");
		else document.body.classList.remove("dark");
	}, [darkMode]);

	const handleModeChange = useCallback((e: any) => {
		dispatch(setDarkMode(e.matches));
	}, []);

	useEffect(() => {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", handleModeChange);

		return () => {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.removeEventListener("change", handleModeChange);
		};
	}, []);

	const [getUserMonths] = useLazyQuery(GET_USER_MONTHS, {
		onCompleted({ getUserMonths }) {
			dispatch(setMonths(getUserMonths));
			dispatch(setActiveDays(moment().format("YYYY-MM")));
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _t.error.title,
					text: `${_t.error.text} '${err}'`,
					type: "error",
				})
			);
		},
	});

	return (
		<PopupContextProvider>
			<Router />

			<Notifications position="tr" />
			<EntryOptions />
			<ConfirmationPoup />
		</PopupContextProvider>
	);
});

/**
 * Base
 */
import { memo, useCallback } from "react";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	selectActiveDate,
	selectActiveMonthId,
	setActiveDays,
	addMonthToMonths,
	addEntryToMonths,
	addEntryToActiveDays,
} from "store/track.slice";
import { addNotification } from "store/app.slice";

/**
 * Apollo
 */
import { useLazyQuery, useMutation } from "@apollo/client";
import { CREATE_ENTRY } from "lib/graphql/entry.queries";
import { GET_MONTH } from "lib/graphql/month.queries";

/**
 * Utilities
 */
import { EntryInitialValues, useEntryForm } from "lib/hooks/useEntryForm";
import { useTranslation } from "lib/hooks/useTranslation";
import { useMoment } from "lib/hooks/useMoment";

/**
 * Components
 */
import { Card, Header } from "ui/card";

interface NewEntryProps {}

export const NewEntry: React.FC<NewEntryProps> = memo(() => {
	const _t = useTranslation("app");
	const _tNot = useTranslation("notifications");
	const moment = useMoment();

	const dispatch = useDispatch();
	const activeMonthId = useSelector(selectActiveMonthId);
	const activeDate = useSelector(selectActiveDate);

	const onFormSubmit = useCallback(async (values: EntryInitialValues) => {
		await createEntry({
			variables: {
				...values,
				amount: values.amount.toString(),
				monthId: activeMonthId,
				type: values.type!.value,
				timestamp: moment(activeDate.day).toISOString(),
				date: activeDate.month,
			},
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [EntryForm] = useEntryForm(onFormSubmit, true);

	const [createEntry] = useMutation(CREATE_ENTRY, {
		onCompleted({ createEntry }) {
			if (!activeMonthId) {
				getMonth({ variables: { id: createEntry.monthId } });
			} else {
				dispatch(addEntryToMonths(createEntry));
				dispatch(addEntryToActiveDays(createEntry));
			}

			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: _tNot.entry.created.title,
					text: `${_tNot.entry.created.text} '${createEntry.description}'`,
					type: "normal",
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

	const [getMonth] = useLazyQuery(GET_MONTH, {
		onCompleted({ getMonth }) {
			dispatch(addMonthToMonths(getMonth));
			dispatch(setActiveDays(getMonth.date));
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

	return (
		<Card>
			<Header title={_t.new_entry.title} />
			{EntryForm}
		</Card>
	);
});

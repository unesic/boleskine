/**
 * Base
 */
import { memo } from "react";

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
 * Components & utilities
 */
import { Card, Header } from "ui/card";

interface NewEntryProps {}

export const NewEntry: React.FC<NewEntryProps> = memo(() => {
	const _t = useTranslation("app");
	const moment = useMoment();

	const dispatch = useDispatch();
	const activeMonthId = useSelector(selectActiveMonthId);
	const activeDate = useSelector(selectActiveDate);

	const foobar = async (values: EntryInitialValues) => {
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
	};

	const [EntryForm] = useEntryForm(foobar, true);

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
					title: "Added new entry!",
					text: `Entry '${createEntry.description}' added!`,
					type: "normal",
				})
			);
		},
		onError(err) {
			dispatch(
				addNotification({
					id: new Date().toISOString(),
					title: "There's been an error!",
					text: `Error: '${err}'`,
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
					title: "There's been an error!",
					text: `Error: '${err}'`,
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

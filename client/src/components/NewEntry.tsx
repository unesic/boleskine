/**
 * Base
 */
import { memo } from "react";
import { useFormik } from "formik";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	addEntryToActiveMonthDays,
	addEntryToMonths,
	addMonthToMonths,
	selectActiveDate,
	selectActiveMonthId,
	setActiveMonthDays,
} from "store/tracking.slice";
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
import { useTranslation } from "lib/hooks/useTranslation";
import { useMoment } from "lib/hooks/useMoment";

/**
 * Components & utilities
 */
import { Card, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Select } from "ui/form/Select";
import { Button } from "ui/misc/Button";
import { initialValues, validationSchema } from "lib/formik/NewEntry.formik";
import { useMemo } from "react";

interface NewEntryProps {}

export const NewEntry: React.FC<NewEntryProps> = memo(() => {
	const _t = useTranslation("app");
	const moment = useMoment();

	const dispatch = useDispatch();
	const activeMonthId = useSelector(selectActiveMonthId);
	const activeDate = useSelector(selectActiveDate);

	const selectOptions = useMemo(
		() => [
			{ value: "inc", label: _t.new_entry.type.inc },
			{ value: "exp", label: _t.new_entry.type.exp },
			{ value: "not", label: _t.new_entry.type.not },
		],
		[_t]
	);

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: async (values, { resetForm }) => {
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
			resetForm();
		},
	});

	const [createEntry] = useMutation(CREATE_ENTRY, {
		onCompleted({ createEntry }) {
			if (!activeMonthId) {
				getMonth({ variables: { id: createEntry.monthId } });
			} else {
				dispatch(addEntryToActiveMonthDays(createEntry));
				dispatch(addEntryToMonths(createEntry));
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
			console.log(err);
		},
	});

	const [getMonth] = useLazyQuery(GET_MONTH, {
		onCompleted({ getMonth }) {
			dispatch(addMonthToMonths(getMonth));
			dispatch(setActiveMonthDays(getMonth.date));
		},
		onError(err) {
			console.log(err);
		},
	});

	return (
		<Card>
			<Header title={_t.new_entry.title} />
			<form onSubmit={formik.handleSubmit}>
				<Text
					id="description"
					name="description"
					type="text"
					value={formik.values.description}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					errors={formik.errors.description}
					touched={formik.touched.description}
					label={_t.new_entry.desc}
				/>
				<Select
					options={selectOptions}
					value={formik.values.type}
					onChange={(value) => formik.setFieldValue("type", value)}
					onBlur={() => formik.setFieldTouched("type", true)}
					errors={formik.errors.type}
					touched={formik.touched.type}
					placeholder={_t.new_entry.type.placeholder}
				/>
				{formik.values.type?.value === "inc" ||
				formik.values.type?.value === "exp" ? (
					<Text
						id="amount"
						name="amount"
						type="number"
						step="any"
						value={formik.values.amount}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						errors={formik.errors.amount}
						touched={formik.touched.amount}
						label={_t.new_entry.amount}
					/>
				) : null}
				<Button type="submit">{_t.new_entry.btn}</Button>
			</form>
		</Card>
	);
});

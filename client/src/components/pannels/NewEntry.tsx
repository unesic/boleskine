/**
 * Base
 */
import { memo } from "react";
import { useFormik } from "formik";
import moment from "moment";

/**
 * Redux
 */
import { useDispatch, useSelector } from "react-redux";
import {
	addEntryToActiveMonthDays,
	selectActiveDate,
	selectActiveMonthId,
} from "store/tracking.slice";
import { addNotification } from "store/app.slice";

/**
 * Components and utilities
 */
import { DraggableCard, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Select } from "ui/form/Select";
import { Button } from "ui/misc/Button";
import { Checkbox } from "ui/form/Checkbox";
import {
	initialValues,
	validationSchema,
	selectOptions,
	checkboxOptions,
} from "./NewEntry.formik";
import { useMutation } from "@apollo/client";
import { CREATE_ENTRY } from "lib/graphql/entry.queries";

interface NewEntryProps {
	id: string;
	idx: number;
}

export const NewEntry: React.FC<NewEntryProps> = memo(({ id, idx }) => {
	const dispatch = useDispatch();
	const activeMonthId = useSelector(selectActiveMonthId);
	const activeDate = useSelector(selectActiveDate);

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
				},
			});
			resetForm();
		},
	});

	const [createEntry] = useMutation(CREATE_ENTRY, {
		onCompleted({ createEntry }) {
			dispatch(addEntryToActiveMonthDays(createEntry));
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

	return (
		<DraggableCard
			draggableId={id}
			index={idx}
			className="col-span-4 px-2 h-max"
		>
			{(dragHandleProps) => (
				<>
					<Header title="Add new entry" xMove dragHandleX={dragHandleProps} />
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
							label="Description"
						/>
						<Select
							options={selectOptions}
							value={formik.values.type}
							onChange={(value) => formik.setFieldValue("type", value)}
							onBlur={() => formik.setFieldTouched("type", true)}
							errors={formik.errors.type}
							touched={formik.touched.type}
							placeholder="Type"
						/>
						{formik.values.type?.value === "inc" ||
						formik.values.type?.value === "exp" ? (
							<Text
								id="amount"
								name="amount"
								type="number"
								value={formik.values.amount}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								errors={formik.errors.amount}
								touched={formik.touched.amount}
								label="Amount"
							/>
						) : null}
						<Checkbox
							options={checkboxOptions}
							value={formik.values.checks}
							onChange={(value) => formik.setFieldValue("checks", value)}
						/>
						<Button type="submit">Add new entry</Button>
					</form>
				</>
			)}
		</DraggableCard>
	);
});

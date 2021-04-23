import { useFormik } from "formik";
import * as Yup from "yup";

import { DraggableCard, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Select } from "ui/form/Select";
import { Checkbox } from "ui/form/Checkbox";
import { Button } from "ui/misc/Button";
import { Textarea } from "ui/form/Textarea";

interface NewEntryProps {
	id: string;
	idx: number;
}

export const NewEntry: React.FC<NewEntryProps> = ({ id, idx }) => {
	const type = Yup.object({
		value: Yup.string(),
		label: Yup.string(),
	});

	const formik = useFormik({
		initialValues: {
			description: "",
			amount: "",
			type: null,
			types: null,
			checks: null,
			long: "",
		},
		validationSchema: Yup.object({
			description: Yup.string()
				.max(10, "Must be 10 characters or less")
				.required("Required"),
			amount: Yup.number().positive("Must be a positive number"),
			type: type.required("Select one").nullable(),
			types: Yup.array()
				.nullable()
				.required("Required")
				.min(2, "Pick at least 2")
				.of(type),
			checks: Yup.array()
				.nullable()
				.of(
					Yup.object({
						name: Yup.string(),
						label: Yup.string(),
					})
				),
			long: Yup.string(),
		}),
		onSubmit: (values) => {
			console.log(values);
		},
	});

	const options = [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
		{ value: "4", label: "Option 4" },
		{ value: "5", label: "Option 5" },
		{ value: "6", label: "Option 6" },
		{ value: "7", label: "Option 7" },
		{ value: "8", label: "Option 8" },
		{ value: "9", label: "Option 9" },
		{ value: "10", label: "Option 10" },
		{ value: "11", label: "Option 11" },
		{ value: "12", label: "Option 12" },
		{ value: "13", label: "Option 13" },
		{ value: "14", label: "Option 14" },
	];

	const checkboxes = [
		{
			name: "opt1",
			label: "Check 1",
		},
		{
			name: "opt2",
			label: "Check 2",
		},
		{
			name: "opt3",
			label: "Check 3",
		},
		{
			name: "opt4",
			label: "Check 4",
		},
	];

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
						<Textarea
							id="long"
							name="long"
							value={formik.values.long}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							errors={formik.errors.long}
							touched={formik.touched.long}
							label="Long text"
						/>
						<Select
							options={options}
							value={formik.values.type}
							onChange={(value) => formik.setFieldValue("type", value)}
							onBlur={() => formik.setFieldTouched("type", true)}
							errors={formik.errors.type}
							touched={formik.touched.type}
							placeholder="Select type..."
						/>
						<Select
							options={options}
							value={formik.values.types}
							onChange={(value) => formik.setFieldValue("types", value)}
							onBlur={() => formik.setFieldTouched("types", true)}
							errors={formik.errors.types}
							touched={formik.touched.types}
							placeholder="Select type..."
							isMulti
						/>
						<Checkbox
							options={checkboxes}
							value={formik.values.checks}
							onChange={(value) => formik.setFieldValue("checks", value)}
						/>
						<Button type="submit">Add new entry</Button>
					</form>
				</>
			)}
		</DraggableCard>
	);
};

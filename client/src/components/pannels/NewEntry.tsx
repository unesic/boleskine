import { useFormik } from "formik";

import { DraggableCard, Header } from "ui/card";
import { Text } from "ui/form/Text";
import { Select } from "ui/form/Select";
import { Checkbox } from "ui/form/Checkbox";
import { Button } from "ui/misc/Button";

import {
	initialValues,
	validationSchema,
	selectOptions,
	checkboxOptions,
} from "./NewEntry.formik";

interface NewEntryProps {
	id: string;
	idx: number;
}

export const NewEntry: React.FC<NewEntryProps> = ({ id, idx }) => {
	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: validationSchema,
		onSubmit: (values) => {
			console.log(values);
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
};

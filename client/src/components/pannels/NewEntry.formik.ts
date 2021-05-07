import * as Yup from "yup";

type EntryType = {
	value: string;
	label: string;
};

const initialValues = {
	description: "",
	amount: "",
	type: null as EntryType | null,
	checks: null,
};

const validationSchema = Yup.object({
	description: Yup.string()
		.max(100, "Must be 100 characters or less")
		.required("Description is required"),
	type: Yup.object({
		value: Yup.string(),
		label: Yup.string(),
	}).required("Please select entry type"),
	amount: Yup.number().when("type", {
		is: (type: EntryType) => type?.value === "inc" || type?.value === "exp",
		then: Yup.number()
			.positive("Amount must be a positive number")
			.required("Please enter an amount"),
	}),
	checks: Yup.array()
		.nullable()
		.of(
			Yup.object({
				name: Yup.string(),
				label: Yup.string(),
			})
		),
});

const selectOptions = [
	{ value: "inc", label: "Income" },
	{ value: "exp", label: "Expense" },
	{ value: "not", label: "Note" },
];

const checkboxOptions = [{ name: "save", label: "Save as preset" }];

export { initialValues, validationSchema, selectOptions, checkboxOptions };

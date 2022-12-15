import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { Select } from "ui/form/Select";

export default {
	title: "UI/Form Fields/Select",
	component: Select,
};

const Template: Story<ComponentProps<typeof Select>> = (args) => (
	<Select {...args} />
);

export const SingleSelect = Template.bind({});
SingleSelect.args = {
	options: [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
		{ value: "4", label: "Option 4" },
	],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
	options: [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
		{ value: "4", label: "Option 4" },
	],
	isMulti: true,
};

export const WithError = Template.bind({});
WithError.args = {
	options: [
		{ value: "1", label: "Option 1" },
		{ value: "2", label: "Option 2" },
		{ value: "3", label: "Option 3" },
		{ value: "4", label: "Option 4" },
	],
	touched: true,
	errors: "Error message",
};

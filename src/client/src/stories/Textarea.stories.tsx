import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { Textarea } from "ui/form/Textarea";

export default {
	title: "UI/Form Fields/Textarea",
	component: Textarea,
};

const Template: Story<ComponentProps<typeof Textarea>> = (args) => (
	<Textarea {...args} />
);

export const Base = Template.bind({});
Base.args = {
	minRows: 3,
	maxRows: 5,
	label: "Textarea",
	value: "",
};

export const WithValue = Template.bind({});
WithValue.args = {
	minRows: 3,
	maxRows: 5,
	label: "Textarea",
	value:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, rerum assumenda incidunt tenetur non deleniti consectetur tempore ex sed.",
};

export const WithError = Template.bind({});
WithError.args = {
	minRows: 3,
	maxRows: 5,
	label: "Textarea",
	value:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, rerum assumenda incidunt tenetur non deleniti consectetur tempore ex sed.",
	touched: true,
	errors: "Error message",
};

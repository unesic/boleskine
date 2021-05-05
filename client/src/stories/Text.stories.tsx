import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { Text } from "ui/form/Text";

export default {
	title: "UI/Form Fields/Text",
	component: Text,
};

const Template: Story<ComponentProps<typeof Text>> = (args) => (
	<Text {...args} />
);

export const Base = Template.bind({});
Base.args = {
	type: "text",
	value: "",
	label: "Text",
};

export const WithValue = Template.bind({});
WithValue.args = {
	type: "text",
	value: "Lorem ipsum dolor sit amet",
	label: "Text",
};

export const WithError = Template.bind({});
WithError.args = {
	type: "text",
	value: "Lorem ipsum dolor sit amet",
	label: "Text",
	touched: true,
	errors: "Error message",
};

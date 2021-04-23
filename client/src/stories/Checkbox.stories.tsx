import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { Checkbox } from "ui/form/Checkbox";

export default {
	title: "UI/Form Fields/Checkbox",
	component: Checkbox,
};

const Template: Story<ComponentProps<typeof Checkbox>> = (args) => (
	<Checkbox {...args} />
);

export const Base = Template.bind({});
Base.args = {
	options: [
		{ name: "1", label: "Option 1" },
		{ name: "2", label: "Option 2" },
		{ name: "3", label: "Option 3" },
		{ name: "4", label: "Option 4" },
	],
	caption: "Caption text",
};

import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { Checkbox as Cb } from "ui/form/Checkbox";

export default {
	title: "UI/Form Fields/Checkbox",
	component: Cb,
};

const Template: Story<ComponentProps<typeof Cb>> = (args) => <Cb {...args} />;

export const Checkbox = Template.bind({});
Checkbox.args = {
	options: [
		{ name: "1", label: "Option 1" },
		{ name: "2", label: "Option 2" },
		{ name: "3", label: "Option 3" },
		{ name: "4", label: "Option 4" },
	],
	caption: "Caption text",
};

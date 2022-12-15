import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { CardExample } from "./examples/Card";

export default {
	title: "UI/Card/Base",
	component: CardExample,
};

const Template: Story<ComponentProps<typeof CardExample>> = (args) => (
	<CardExample {...args} />
);

export const Base = Template.bind({});
Base.args = {};

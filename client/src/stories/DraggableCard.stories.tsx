import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { DraggableCardExample } from "./examples/Card";

export default {
	title: "UI/Card/Draggable",
	component: DraggableCardExample,
};

const Template: Story<ComponentProps<typeof DraggableCardExample>> = (args) => (
	<DraggableCardExample {...args} />
);

export const Draggable = Template.bind({});
Draggable.args = {
	direction: "horizontal",
};

import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { SocialButtons as SB } from "ui/misc/SocialButtons";

export default {
	title: "UI/Misc/Social Buttons",
	component: SB,
};

const Template: Story<ComponentProps<typeof SB>> = (args) => (
	<SocialButtons {...args} />
);

export const SocialButtons = Template.bind({});
SocialButtons.args = {
	variant: "signup",
};

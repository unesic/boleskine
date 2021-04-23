import { ComponentProps } from "react";
import { Story } from "@storybook/react";

import { SocialButtons } from "ui/misc/SocialButtons";

export default {
	title: "UI/Misc/Social",
	component: SocialButtons,
};

const Template: Story<ComponentProps<typeof SocialButtons>> = (args) => (
	<SocialButtons {...args} />
);

export const Social = Template.bind({});
Social.args = {
	variant: "signup",
};

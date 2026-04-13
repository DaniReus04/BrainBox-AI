import type { Meta, StoryObj } from "@storybook/react-vite";

import { LanguageToggle } from "./language-toggle";

const meta: Meta<typeof LanguageToggle> = {
  title: "UI/LanguageToggle",
  component: LanguageToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="relative flex h-40 items-start justify-center pt-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LanguageToggle>;

export const Default: Story = {};

export const WithCustomClass: Story = {
  args: {
    buttonClassName: "bg-muted rounded-full",
  },
};

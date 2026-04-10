import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageIndicator } from "./page-indicator";

const meta: Meta<typeof PageIndicator> = {
  title: "UI/PageIndicator",
  component: PageIndicator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageIndicator>;

export const Default: Story = {
  args: {
    total: 3,
    current: 0,
  },
};

export const Middle: Story = {
  args: {
    total: 3,
    current: 1,
  },
};

export const LastPage: Story = {
  args: {
    total: 5,
    current: 4,
  },
};

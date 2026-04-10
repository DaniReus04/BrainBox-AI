import type { Meta, StoryObj } from "@storybook/react-vite";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "UI/Logo",
  component: Logo,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    showText: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {};

export const IconOnly: Story = {
  args: {
    showText: false,
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    orientation: "vertical",
  },
};

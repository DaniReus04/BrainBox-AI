import type { Meta, StoryObj } from "@storybook/react-vite";

import { AlertBanner } from "./alert-banner";

const meta = {
  title: "Components/AlertBanner",
  component: AlertBanner,
  args: {
    title: "Success",
    message: "Action completed successfully",
    variant: "success",
  },
  argTypes: {
    variant: {
      control: { type: "inline-radio" },
      options: ["success", "error"],
    },
  },
} satisfies Meta<typeof AlertBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const ErrorState: Story = {
  args: {
    variant: "error",
    title: "Error",
    message: "Something went wrong",
  },
};

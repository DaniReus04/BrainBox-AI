import type { Meta, StoryObj } from "@storybook/react-vite";
import { ConfirmDialog } from "./confirm-dialog";

const meta: Meta<typeof ConfirmDialog> = {
  title: "UI/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    open: true,
    title: "Delete chat?",
    description: "Are you sure you want to delete this chat?",
    cancelLabel: "Cancel",
    confirmLabel: "Delete",
    onCancel: () => {},
    onConfirm: () => {},
    destructive: true,
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {};

export const Closed: Story = {
  args: {
    open: false,
  },
};

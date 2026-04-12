import type { Meta, StoryObj } from "@storybook/react-vite";
import { SkipConfirmDialog } from "./skip-confirm-dialog";

const meta: Meta<typeof SkipConfirmDialog> = {
  title: "UI/SkipConfirmDialog",
  component: SkipConfirmDialog,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    open: true,
    title: "Skip Tutorial?",
    description:
      "Are you sure you want to skip the tutorial? You can always learn about BrainBox later.",
    cancelLabel: "Cancel",
    confirmLabel: "Yes, skip",
    onCancel: () => {},
    onConfirm: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SkipConfirmDialog>;

export const Default: Story = {};

export const Closed: Story = {
  args: { open: false },
};

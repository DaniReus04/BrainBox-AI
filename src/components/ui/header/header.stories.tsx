import { DotsThreeVertical } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./header";

const meta: Meta<typeof Header> = {
  title: "UI/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: "BrainBox",
  },
};

export const WithBackButton: Story = {
  args: {
    title: "Health",
    onBack: () => {},
  },
};

export const WithRightAction: Story = {
  args: {
    title: "Health",
    onBack: () => {},
    rightAction: (
      <button
        type="button"
        className="inline-flex size-8 items-center justify-center rounded-full hover:bg-muted"
      >
        <DotsThreeVertical size={20} weight="bold" />
      </button>
    ),
  },
};

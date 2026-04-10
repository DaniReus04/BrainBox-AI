import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChatInput } from "./chat-input";

const meta: Meta<typeof ChatInput> = {
  title: "UI/ChatInput",
  component: ChatInput,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="mx-auto flex h-dvh w-full max-w-sm flex-col">
        <div className="flex-1" />
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Empty: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: "Tell me about healthy habits",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "AI is typing...",
  },
};

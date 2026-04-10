import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChatBubble } from "./chat-bubble";

const meta: Meta<typeof ChatBubble> = {
  title: "UI/ChatBubble",
  component: ChatBubble,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["ai", "user"] },
  },
};

export default meta;
type Story = StoryObj<typeof ChatBubble>;

export const AI: Story = {
  args: {
    variant: "ai",
    children:
      "Hello! I can help you with health-related questions. What would you like to know?",
  },
};

export const User: Story = {
  args: {
    variant: "user",
    children: "What are some tips for better sleep?",
  },
};

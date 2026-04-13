import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChatActionsMenu } from "./chat-actions-menu";

const sampleMessages = [
  { role: "user" as const, content: "What are your support hours?" },
  {
    role: "assistant" as const,
    content:
      "FinTechX support is available Monday to Friday from 8 AM to 6 PM and Saturday from 9 AM to 1 PM.",
  },
];

const meta: Meta<typeof ChatActionsMenu> = {
  title: "UI/ChatActionsMenu",
  component: ChatActionsMenu,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="flex min-h-[180px] items-start justify-end p-8">
        <Story />
      </div>
    ),
  ],
  args: {
    messages: sampleMessages,
    downloadTitle: "brainbox-chat",
    onDelete: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof ChatActionsMenu>;

export const Default: Story = {};

export const EmptyState: Story = {
  args: {
    messages: [],
  },
};

import { ChatText, GearSix, Heart, House } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomNav } from "./bottom-nav";

const defaultItems = [
  { icon: <House size={24} />, label: "Home" },
  { icon: <ChatText size={24} />, label: "Chat" },
  { icon: <Heart size={24} />, label: "Favorites" },
  { icon: <GearSix size={24} />, label: "Settings" },
];

const meta: Meta<typeof BottomNav> = {
  title: "UI/BottomNav",
  component: BottomNav,
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
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {
  args: {
    items: defaultItems,
    activeIndex: 0,
  },
};

export const ChatActive: Story = {
  args: {
    items: defaultItems,
    activeIndex: 1,
  },
};

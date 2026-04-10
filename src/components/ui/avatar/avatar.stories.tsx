import type { Meta, StoryObj } from "@storybook/react-vite";
import robotImage from "@/assets/img/robot-image.png";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: {
    src: robotImage,
    alt: "Robot Image",
  },
};

export const WithFallback: Story = {
  args: {
    fallback: "TH",
  },
};

export const Small: Story = {
  args: {
    fallback: "TH",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    src: robotImage,
    alt: "Robot Image",
    size: "lg",
  },
};

export const ProfileBordered: Story = {
  args: {
    src: robotImage,
    alt: "Robot Image",
    size: "lg",
    bordered: true,
  },
};

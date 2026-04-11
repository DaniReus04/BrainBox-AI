import type { Meta, StoryObj } from "@storybook/react-vite";
import { Loading } from "./loading";

const meta: Meta<typeof Loading> = {
  title: "UI/Loading",
  component: Loading,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {};

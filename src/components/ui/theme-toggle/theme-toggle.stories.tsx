import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";

import { ThemeToggle } from "./theme-toggle";

const meta: Meta<typeof ThemeToggle> = {
  title: "UI/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const LightMode: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.documentElement.classList.remove("dark");
      }, []);
      return <Story />;
    },
  ],
};

export const DarkMode: Story = {
  decorators: [
    (Story) => {
      useEffect(() => {
        document.documentElement.classList.add("dark");
        return () => {
          document.documentElement.classList.remove("dark");
        };
      }, []);
      return (
        <div className="dark">
          <Story />
        </div>
      );
    },
  ],
};

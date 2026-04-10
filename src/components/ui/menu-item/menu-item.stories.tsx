import {
  CreditCard,
  GearSix,
  Lock,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MenuItem } from "./menu-item";

const meta: Meta<typeof MenuItem> = {
  title: "UI/MenuItem",
  component: MenuItem,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    variant: { control: "select", options: ["default", "destructive"] },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-sm p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
  args: {
    label: "Preferences",
    icon: <GearSix size={20} />,
  },
};

export const WithoutIcon: Story = {
  args: {
    label: "Account Information",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Password",
    description: "Change your Password",
    icon: <Lock size={20} />,
  },
};

export const Destructive: Story = {
  args: {
    label: "Logout",
    icon: <SignOut size={20} />,
    variant: "destructive",
  },
};

export const PreferencesList: Story = {
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-1">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <MenuItem
        label="Preference"
        description="Manage your preferences"
        icon={<GearSix size={20} />}
      />
      <MenuItem
        label="Account Information"
        description="Update your information"
        icon={<UserCircle size={20} />}
      />
      <MenuItem
        label="Password"
        description="Change your Password"
        icon={<Lock size={20} />}
      />
      <MenuItem
        label="Payment Methods"
        description="Add your Credit/Debit Cards"
        icon={<CreditCard size={20} />}
      />
      <MenuItem
        label="Logout"
        icon={<SignOut size={20} />}
        variant="destructive"
      />
    </>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import { AlertHost, pushAlert } from "./alert-bus";

const meta: Meta<typeof AlertHost> = {
  title: "UI/AlertHost",
  component: AlertHost,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AlertHost>;

export const Default: Story = {
  render: () => (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <AlertHost />
      <button
        type="button"
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        onClick={() =>
          pushAlert({
            title: "Success",
            message: "Action completed successfully",
          })
        }
      >
        Push success alert
      </button>
      <button
        type="button"
        className="rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive"
        onClick={() =>
          pushAlert({
            variant: "error",
            title: "Error",
            message: "Something went wrong. Try again.",
          })
        }
      >
        Push error alert
      </button>
    </div>
  ),
};

export const SuccessAlert: Story = {
  render: () => {
    pushAlert({ title: "Done", message: "Your changes have been saved." });
    return <AlertHost />;
  },
};

export const ErrorAlert: Story = {
  render: () => {
    pushAlert({
      variant: "error",
      title: "Failed",
      message: "Unable to complete the request.",
    });
    return <AlertHost />;
  },
};

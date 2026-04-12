import type { Meta, StoryObj } from "@storybook/react-vite";
import robotImage from "@/assets/img/robot-image.png";
import { OnboardingCard } from "./onboarding-card";

const steps = [
  {
    title: "Unlock the Power Of Future AI",
    description:
      "Chat with the smartest AI Future\nExperience power of AI with us",
    image: robotImage,
  },
  {
    title: "Your Personal AI Assistant",
    description:
      "Get instant answers, creative ideas, and smart solutions\nPowered by cutting-edge technology",
    image: robotImage,
  },
  {
    title: "Start Your Journey Now",
    description:
      "Join thousands of users already enjoying BrainBox\nYour AI companion awaits",
    image: robotImage,
  },
];

const meta: Meta<typeof OnboardingCard> = {
  title: "UI/OnboardingCard",
  component: OnboardingCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    steps,
    skipLabel: "Skip",
    onNext: () => {},
    onPrev: () => {},
    onSkip: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingCard>;

export const FirstStep: Story = {
  args: { currentStep: 0 },
};

export const MiddleStep: Story = {
  args: { currentStep: 1 },
};

export const LastStep: Story = {
  args: { currentStep: 2 },
};

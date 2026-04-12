import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { OnboardingCard, type OnboardingStep } from "./onboarding-card";

const steps: OnboardingStep[] = [
  {
    title: "Step 1 Title",
    description: "Step 1 description",
    image: "/robot.png",
  },
  {
    title: "Step 2 Title",
    description: "Step 2 description",
    image: "/robot.png",
  },
  {
    title: "Step 3 Title",
    description: "Step 3 description",
    image: "/robot.png",
  },
];

const defaultProps = {
  steps,
  currentStep: 0,
  onNext: vi.fn(),
  onPrev: vi.fn(),
  onSkip: vi.fn(),
  skipLabel: "Skip",
};

describe("OnboardingCard", () => {
  it("should render the current step title and description", () => {
    render(<OnboardingCard {...defaultProps} />);
    expect(screen.getByText("Step 1 Title")).toBeInTheDocument();
    expect(screen.getByText("Step 1 description")).toBeInTheDocument();
  });

  it("should render the skip button", () => {
    render(<OnboardingCard {...defaultProps} />);
    expect(screen.getByText("Skip")).toBeInTheDocument();
  });

  it("should call onSkip when skip button is clicked", () => {
    const onSkip = vi.fn();
    render(<OnboardingCard {...defaultProps} onSkip={onSkip} />);
    fireEvent.click(screen.getByText("Skip"));
    expect(onSkip).toHaveBeenCalledOnce();
  });

  it("should call onNext when next button is clicked", () => {
    const onNext = vi.fn();
    render(<OnboardingCard {...defaultProps} onNext={onNext} />);
    fireEvent.click(screen.getByLabelText("Next step"));
    expect(onNext).toHaveBeenCalledOnce();
  });

  it("should disable prev button on first step", () => {
    render(<OnboardingCard {...defaultProps} currentStep={0} />);
    expect(screen.getByLabelText("Previous step")).toBeDisabled();
  });

  it("should call onPrev when prev button is clicked on non-first step", () => {
    const onPrev = vi.fn();
    render(
      <OnboardingCard {...defaultProps} currentStep={1} onPrev={onPrev} />,
    );
    fireEvent.click(screen.getByLabelText("Previous step"));
    expect(onPrev).toHaveBeenCalledOnce();
  });

  it("should show 'Finish onboarding' label on last step", () => {
    render(<OnboardingCard {...defaultProps} currentStep={2} />);
    expect(screen.getByLabelText("Finish onboarding")).toBeInTheDocument();
  });

  it("should render the robot image", () => {
    render(<OnboardingCard {...defaultProps} />);
    expect(screen.getByAltText("BrainBox AI")).toBeInTheDocument();
  });

  it("should render page indicators", () => {
    const { container } = render(<OnboardingCard {...defaultProps} />);
    const indicator = container.querySelector('[data-slot="page-indicator"]');
    expect(indicator).toBeInTheDocument();
  });
});

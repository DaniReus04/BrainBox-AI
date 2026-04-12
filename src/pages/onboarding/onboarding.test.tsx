import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AlertHost } from "@/components/ui/alert-banner/alert-bus";
import { AuthProvider } from "@/context/auth-context";
import { OnboardingPage } from "./onboarding";

vi.mock("@/services/onboarding", () => ({
  saveOnboardingStatus: vi
    .fn()
    .mockResolvedValue({ status: "completed", completedAt: "" }),
}));

vi.mock("@/services/auth", () => ({
  markOnboardingDone: vi.fn().mockResolvedValue({ success: true }),
}));

function renderOnboarding() {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/onboarding"]}>
        <OnboardingPage />
        <AlertHost />
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("OnboardingPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render the first step by default", () => {
    renderOnboarding();
    expect(
      screen.getByText("Unlock the Power Of Future AI"),
    ).toBeInTheDocument();
  });

  it("should navigate to next step", async () => {
    renderOnboarding();
    fireEvent.click(screen.getByLabelText("Next step"));
    await act(() => vi.advanceTimersByTime(300));
    expect(screen.getByText("Your Personal AI Assistant")).toBeInTheDocument();
  });

  it("should navigate back to previous step", async () => {
    renderOnboarding();
    fireEvent.click(screen.getByLabelText("Next step"));
    await act(() => vi.advanceTimersByTime(300));
    fireEvent.click(screen.getByLabelText("Previous step"));
    await act(() => vi.advanceTimersByTime(300));
    expect(
      screen.getByText("Unlock the Power Of Future AI"),
    ).toBeInTheDocument();
  });

  it("should open skip dialog when Skip is clicked", () => {
    renderOnboarding();
    fireEvent.click(screen.getByText("Skip"));
    expect(screen.getByText("Skip Tutorial?")).toBeInTheDocument();
  });

  it("should close skip dialog when Cancel is clicked", () => {
    renderOnboarding();
    fireEvent.click(screen.getByText("Skip"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Skip Tutorial?")).not.toBeInTheDocument();
  });
});

import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("@/services/onboarding", () => ({
  saveOnboardingStatus: vi
    .fn()
    .mockResolvedValue({ status: "completed", completedAt: "" }),
}));

describe("App", () => {
  beforeEach(() => {
    // biome-ignore lint/suspicious/noDocumentCookie: test setup requires direct cookie manipulation
    document.cookie =
      "brainbox_onboarding_done=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  });

  it("should render the splash screen initially", () => {
    render(<App />);
    expect(screen.getByText("BrainBox")).toBeInTheDocument();
  });

  it("should show onboarding after splash when no cookie", async () => {
    vi.useFakeTimers();
    render(<App />);
    await act(() => vi.advanceTimersByTime(3000));
    vi.useRealTimers();
    await waitFor(() => {
      expect(
        screen.getByText("Unlock the Power Of Future AI"),
      ).toBeInTheDocument();
    });
  });

  it("should skip onboarding when cookie exists", async () => {
    // biome-ignore lint/suspicious/noDocumentCookie: test setup requires direct cookie manipulation
    document.cookie = "brainbox_onboarding_done=completed; path=/";
    vi.useFakeTimers();
    render(<App />);
    await act(() => vi.advanceTimersByTime(3000));
    vi.useRealTimers();
    await waitFor(() => {
      expect(screen.getByText("Home — Coming soon")).toBeInTheDocument();
    });
  });
});

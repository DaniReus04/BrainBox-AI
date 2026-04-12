import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ONBOARDING_COOKIE, Onboarding } from "./onboarding";

vi.mock("@/services/onboarding", () => ({
  saveOnboardingStatus: vi
    .fn()
    .mockResolvedValue({ status: "completed", completedAt: "" }),
}));

describe("Onboarding", () => {
  const onComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    // biome-ignore lint/suspicious/noDocumentCookie: test setup requires direct cookie manipulation
    document.cookie = `${ONBOARDING_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render the first step by default", () => {
    render(<Onboarding onComplete={onComplete} />);
    expect(
      screen.getByText("Unlock the Power Of Future AI"),
    ).toBeInTheDocument();
  });

  it("should navigate to next step", async () => {
    render(<Onboarding onComplete={onComplete} />);
    fireEvent.click(screen.getByLabelText("Next step"));
    await act(() => vi.advanceTimersByTime(300));
    expect(screen.getByText("Your Personal AI Assistant")).toBeInTheDocument();
  });

  it("should navigate back to previous step", async () => {
    render(<Onboarding onComplete={onComplete} />);
    fireEvent.click(screen.getByLabelText("Next step"));
    await act(() => vi.advanceTimersByTime(300));
    fireEvent.click(screen.getByLabelText("Previous step"));
    await act(() => vi.advanceTimersByTime(300));
    expect(
      screen.getByText("Unlock the Power Of Future AI"),
    ).toBeInTheDocument();
  });

  it("should call onComplete when finishing last step", async () => {
    render(<Onboarding onComplete={onComplete} />);
    fireEvent.click(screen.getByLabelText("Next step"));
    await act(() => vi.advanceTimersByTime(300));
    fireEvent.click(screen.getByLabelText("Next step"));
    await act(() => vi.advanceTimersByTime(300));
    fireEvent.click(screen.getByLabelText("Finish onboarding"));
    vi.useRealTimers();
    await waitFor(() => expect(onComplete).toHaveBeenCalledOnce());
  });

  it("should open skip dialog when Skip is clicked", () => {
    render(<Onboarding onComplete={onComplete} />);
    fireEvent.click(screen.getByText("Skip"));
    expect(screen.getByText("Skip Tutorial?")).toBeInTheDocument();
  });

  it("should close skip dialog when Cancel is clicked", () => {
    render(<Onboarding onComplete={onComplete} />);
    fireEvent.click(screen.getByText("Skip"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Skip Tutorial?")).not.toBeInTheDocument();
  });

  it("should call onComplete when skip is confirmed", async () => {
    render(<Onboarding onComplete={onComplete} />);
    fireEvent.click(screen.getByText("Skip"));
    fireEvent.click(screen.getByText("Yes, skip"));
    vi.useRealTimers();
    await waitFor(() => expect(onComplete).toHaveBeenCalledOnce());
  });
});

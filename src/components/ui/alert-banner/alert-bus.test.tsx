import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { AlertHost, pushAlert } from "./alert-bus";

describe("AlertHost", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runAllTimers();
    vi.useRealTimers();
  });

  it("should render nothing when no alerts exist", () => {
    const { container } = render(<AlertHost />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should display an alert after pushAlert is called", async () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({ title: "Success", message: "Action completed" });
    });
    expect(await screen.findByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Action completed")).toBeInTheDocument();
  });

  it("should display error variant alert", async () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({
        variant: "error",
        title: "Error",
        message: "Something failed",
      });
    });
    expect(await screen.findByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something failed")).toBeInTheDocument();
  });

  it("should remove the alert after durationMs", async () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({ title: "Gone", message: "Disappears", durationMs: 1000 });
    });
    expect(await screen.findByText("Gone")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(screen.queryByText("Gone")).not.toBeInTheDocument();
    });
  });

  it("should display multiple alerts at once", async () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({ title: "First", message: "First alert" });
      pushAlert({ title: "Second", message: "Second alert" });
    });
    expect(await screen.findByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("should use default durationMs and variant when not specified", async () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({ title: "Default", message: "Default alert" });
    });
    expect(await screen.findByText("Default")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3500);
    });
    await waitFor(() => {
      expect(screen.queryByText("Default")).not.toBeInTheDocument();
    });
  });
});

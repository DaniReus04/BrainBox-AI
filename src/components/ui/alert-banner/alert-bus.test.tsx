import { act, render, screen } from "@testing-library/react";
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

  it("should display an alert after pushAlert is called", () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({ title: "Success", message: "Action completed" });
    });
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(screen.getByText("Action completed")).toBeInTheDocument();
  });

  it("should display error variant alert", () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({
        variant: "error",
        title: "Error",
        message: "Something failed",
      });
    });
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something failed")).toBeInTheDocument();
  });

  it("should remove the alert after durationMs", () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({ title: "Gone", message: "Disappears", durationMs: 1000 });
    });
    expect(screen.getByText("Gone")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("Gone")).not.toBeInTheDocument();
  });

  it("should display multiple alerts at once", () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({ title: "First", message: "First alert" });
      pushAlert({ title: "Second", message: "Second alert" });
    });
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
  });

  it("should use default durationMs of 3500ms", () => {
    render(<AlertHost />);
    act(() => {
      pushAlert({ title: "Default", message: "Default alert" });
    });
    expect(screen.getByText("Default")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3500);
    });
    expect(screen.queryByText("Default")).not.toBeInTheDocument();
  });
});

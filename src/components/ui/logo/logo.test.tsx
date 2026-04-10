import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./logo";

describe("Logo", () => {
  it("should render with text by default", () => {
    render(<Logo />);
    expect(screen.getByText("BrainBox")).toBeInTheDocument();
  });

  it("should hide text when showText is false", () => {
    render(<Logo showText={false} />);
    expect(screen.queryByText("BrainBox")).not.toBeInTheDocument();
  });

  it("should always render the icon SVG", () => {
    const { container } = render(<Logo showText={false} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Logo data-testid="logo" className="text-white" />);
    expect(screen.getByTestId("logo")).toHaveClass("text-white");
  });
});

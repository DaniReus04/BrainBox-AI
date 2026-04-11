import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loading } from "./loading";

describe("Loading", () => {
  it("should render the BrainBox text", () => {
    render(<Loading />);
    expect(screen.getByText("BrainBox")).toBeInTheDocument();
  });

  it("should render the version text", () => {
    render(<Loading />);
    expect(screen.getByText("Version 1.0")).toBeInTheDocument();
  });

  it("should render the logo image", () => {
    render(<Loading />);
    expect(screen.getByAltText("BrainBox logo")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Loading data-testid="loading" className="custom-class" />);
    expect(screen.getByTestId("loading")).toHaveClass("custom-class");
  });
});

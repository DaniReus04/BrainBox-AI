import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("should render image when src is provided", () => {
    render(<Avatar src="/photo.jpg" alt="User" />);
    const img = screen.getByAltText("User");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/photo.jpg");
  });

  it("should render fallback when src is not provided", () => {
    render(<Avatar fallback="TH" />);
    expect(screen.getByText("TH")).toBeInTheDocument();
  });

  it("should render first letter of alt as fallback", () => {
    render(<Avatar alt="Tom" />);
    expect(screen.getByText("T")).toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<Avatar data-testid="avatar" className="border-2" />);
    expect(screen.getByTestId("avatar")).toHaveClass("border-2");
  });

  it("should apply ring classes when bordered", () => {
    render(<Avatar data-testid="avatar" bordered />);
    expect(screen.getByTestId("avatar")).toHaveClass("ring-2");
    expect(screen.getByTestId("avatar")).toHaveClass("ring-primary");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MenuItem } from "./menu-item";

describe("MenuItem", () => {
  it("should render label", () => {
    render(<MenuItem label="Preferences" />);
    expect(screen.getByText("Preferences")).toBeInTheDocument();
  });

  it("should render icon when provided", () => {
    render(
      <MenuItem label="Settings" icon={<span data-testid="icon">⚙</span>} />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    const onClick = vi.fn();
    render(<MenuItem label="Profile" onClick={onClick} />);
    screen.getByRole("button").click();
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("should render description when provided", () => {
    render(<MenuItem label="Password" description="Change your Password" />);
    expect(screen.getByText("Change your Password")).toBeInTheDocument();
  });

  it("should apply destructive variant", () => {
    render(<MenuItem label="Logout" variant="destructive" />);
    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "destructive",
    );
  });
});

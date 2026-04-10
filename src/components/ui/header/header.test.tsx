import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  it("should render title", () => {
    render(<Header title="Health" />);
    expect(screen.getByText("Health")).toBeInTheDocument();
  });

  it("should render back button when onBack is provided", () => {
    const onBack = vi.fn();
    render(<Header title="Settings" onBack={onBack} />);
    expect(screen.getByLabelText("Go back")).toBeInTheDocument();
  });

  it("should call onBack when back button is clicked", () => {
    const onBack = vi.fn();
    render(<Header title="Settings" onBack={onBack} />);
    screen.getByLabelText("Go back").click();
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("should render right action", () => {
    render(
      <Header title="Chat" rightAction={<button type="button">Menu</button>} />,
    );
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });
});

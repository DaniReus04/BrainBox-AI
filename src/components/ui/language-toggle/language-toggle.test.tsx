import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LanguageToggle } from "./language-toggle";

describe("LanguageToggle", () => {
  it("should render the current language label", () => {
    render(<LanguageToggle />);
    expect(
      screen.getByRole("button", { name: /change language/i }),
    ).toBeInTheDocument();
  });

  it("should not show language options when closed", () => {
    render(<LanguageToggle />);
    expect(screen.queryByText("English")).not.toBeInTheDocument();
  });

  it("should open dropdown when button is clicked", () => {
    render(<LanguageToggle />);
    fireEvent.click(screen.getByRole("button", { name: /change language/i }));
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Português")).toBeInTheDocument();
    expect(screen.getByText("Español")).toBeInTheDocument();
  });

  it("should close dropdown when same button is clicked again", () => {
    render(<LanguageToggle />);
    const trigger = screen.getByRole("button", { name: /change language/i });
    fireEvent.click(trigger);
    expect(screen.getByText("English")).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.queryByText("English")).not.toBeInTheDocument();
  });

  it("should close dropdown when a language is selected", () => {
    render(<LanguageToggle />);
    fireEvent.click(screen.getByRole("button", { name: /change language/i }));
    fireEvent.click(screen.getByText("Português"));
    expect(screen.queryByText("English")).not.toBeInTheDocument();
  });

  it("should close dropdown when clicking outside", () => {
    render(
      <div>
        <LanguageToggle />
        <div data-testid="outside">Outside</div>
      </div>,
    );
    fireEvent.click(screen.getByRole("button", { name: /change language/i }));
    expect(screen.getByText("English")).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(screen.queryByText("English")).not.toBeInTheDocument();
  });

  it("should apply custom className", () => {
    render(<LanguageToggle className="custom-class" />);
    const container = screen.getByRole("button", {
      name: /change language/i,
    }).parentElement;
    expect(container).toHaveClass("custom-class");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ChatInput } from "./chat-input";

describe("ChatInput", () => {
  it("should render with placeholder", () => {
    render(<ChatInput />);
    expect(
      screen.getByPlaceholderText("Send a message..."),
    ).toBeInTheDocument();
  });

  it("should render send button", () => {
    render(<ChatInput />);
    expect(screen.getByLabelText("Send message")).toBeInTheDocument();
  });

  it("should call onSubmit when send button is clicked", () => {
    const onSubmit = vi.fn();
    render(<ChatInput value="Hello" onSubmit={onSubmit} />);
    screen.getByLabelText("Send message").click();
    expect(onSubmit).toHaveBeenCalledWith("Hello");
  });

  it("should disable send button when value is empty", () => {
    render(<ChatInput value="" />);
    expect(screen.getByLabelText("Send message")).toBeDisabled();
  });
});

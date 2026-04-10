import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatBubble } from "./chat-bubble";

describe("ChatBubble", () => {
  it("should render children content", () => {
    render(<ChatBubble>Hello world</ChatBubble>);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("should apply ai variant by default", () => {
    render(<ChatBubble>AI message</ChatBubble>);
    const bubble = screen.getByText("AI message");
    expect(bubble).toHaveAttribute("data-variant", "ai");
  });

  it("should apply user variant", () => {
    render(<ChatBubble variant="user">User message</ChatBubble>);
    const bubble = screen.getByText("User message");
    expect(bubble).toHaveAttribute("data-variant", "user");
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BottomNav } from "./bottom-nav";

const items = [
  { icon: <span>H</span>, label: "Home" },
  { icon: <span>C</span>, label: "Chat" },
  { icon: <span>F</span>, label: "Favorites" },
  { icon: <span>S</span>, label: "Settings" },
];

describe("BottomNav", () => {
  it("should render all nav items", () => {
    render(<BottomNav items={items} />);
    for (const item of items) {
      expect(screen.getByLabelText(item.label)).toBeInTheDocument();
    }
  });

  it("should mark active item with aria-current", () => {
    render(<BottomNav items={items} activeIndex={1} />);
    expect(screen.getByLabelText("Chat")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("should not mark inactive items with aria-current", () => {
    render(<BottomNav items={items} activeIndex={0} />);
    expect(
      screen.getByLabelText("Chat").getAttribute("aria-current"),
    ).toBeNull();
  });

  it("should call onSelect when item is clicked", () => {
    const onSelect = vi.fn();
    render(<BottomNav items={items} onSelect={onSelect} />);
    screen.getByLabelText("Chat").click();
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});

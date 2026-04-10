import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageIndicator } from "./page-indicator";

describe("PageIndicator", () => {
  it("should render correct number of dots", () => {
    const { container } = render(<PageIndicator total={3} current={0} />);
    const dots = container.querySelectorAll(
      "[data-slot='page-indicator'] > span",
    );
    expect(dots).toHaveLength(3);
  });

  it("should mark current dot as active", () => {
    const { container } = render(<PageIndicator total={3} current={1} />);
    const dots = container.querySelectorAll(
      "[data-slot='page-indicator'] > span",
    );
    expect(dots[1]).toHaveAttribute("data-active", "true");
  });

  it("should mark other dots as inactive", () => {
    const { container } = render(<PageIndicator total={3} current={0} />);
    const dots = container.querySelectorAll(
      "[data-slot='page-indicator'] > span",
    );
    expect(dots[1]).toHaveAttribute("data-active", "false");
    expect(dots[2]).toHaveAttribute("data-active", "false");
  });
});

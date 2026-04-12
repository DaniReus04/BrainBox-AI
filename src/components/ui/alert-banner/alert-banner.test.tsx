import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AlertBanner } from "./alert-banner";

describe("AlertBanner", () => {
  it("renders success variant", () => {
    render(<AlertBanner variant="success" title="Done" message="All good" />);
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("All good")).toBeInTheDocument();
  });

  it("renders error variant", () => {
    render(
      <AlertBanner variant="error" title="Error" message="Something broke" />,
    );
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something broke")).toBeInTheDocument();
  });
});

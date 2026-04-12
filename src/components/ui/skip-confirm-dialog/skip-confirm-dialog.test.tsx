import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SkipConfirmDialog } from "./skip-confirm-dialog";

const defaultProps = {
  open: true,
  title: "Skip Tutorial?",
  description: "Are you sure?",
  cancelLabel: "Cancel",
  confirmLabel: "Yes, skip",
  onCancel: vi.fn(),
  onConfirm: vi.fn(),
};

describe("SkipConfirmDialog", () => {
  it("should render title and description when open", () => {
    render(<SkipConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Skip Tutorial?")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(<SkipConfirmDialog {...defaultProps} open={false} />);
    expect(screen.queryByText("Skip Tutorial?")).not.toBeInTheDocument();
  });

  it("should call onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(<SkipConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("should call onConfirm when confirm button is clicked", () => {
    const onConfirm = vi.fn();
    render(<SkipConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText("Yes, skip"));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("should call onCancel when Escape is pressed", () => {
    const onCancel = vi.fn();
    render(<SkipConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("should call onCancel when overlay is clicked", () => {
    const onCancel = vi.fn();
    render(<SkipConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByLabelText("Close dialog"));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("should render the alertdialog role", () => {
    render(<SkipConfirmDialog {...defaultProps} />);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});

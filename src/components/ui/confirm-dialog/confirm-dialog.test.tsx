import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialog } from "./confirm-dialog";

const defaultProps = {
  open: true,
  title: "Delete chat?",
  description: "Are you sure you want to delete this chat?",
  cancelLabel: "Cancel",
  confirmLabel: "Delete",
  onCancel: vi.fn(),
  onConfirm: vi.fn(),
};

describe("ConfirmDialog", () => {
  it("should render title and description when open", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Delete chat?")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to delete this chat?"),
    ).toBeInTheDocument();
  });

  it("should not render when closed", () => {
    render(<ConfirmDialog {...defaultProps} open={false} />);
    expect(screen.queryByText("Delete chat?")).not.toBeInTheDocument();
  });

  it("should call onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("should call onConfirm when confirm button is clicked", () => {
    const onConfirm = vi.fn();
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("should call onCancel when Escape is pressed", () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("should call onCancel when overlay is clicked", () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByLabelText("Close dialog"));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("should render the alertdialog role", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});

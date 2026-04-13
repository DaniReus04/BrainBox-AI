import type * as React from "react";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps extends React.ComponentProps<"div"> {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  destructive?: boolean;
}

function ConfirmDialogOverlay({ onDismiss }: { onDismiss: () => void }) {
  return (
    <button
      type="button"
      className="fixed inset-0 z-40 cursor-pointer bg-black/50 backdrop-blur-sm"
      onClick={onDismiss}
      aria-label="Close dialog"
      tabIndex={-1}
    />
  );
}

function ConfirmDialog({
  open,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  destructive = false,
  className,
  ...props
}: ConfirmDialogProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    },
    [onCancel],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <ConfirmDialogOverlay onDismiss={onCancel} />

      <div
        role="alertdialog"
        aria-modal="true"
        className={cn(
          "relative z-50 w-full max-w-sm rounded-[24px] bg-card p-6 shadow-[0_24px_60px_rgba(0,0,0,0.22)]",
          className,
        )}
        {...props}
      >
        <h3 className="text-center text-base font-semibold text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
          {description}
        </p>

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="secondary"
            className="h-11 flex-1 rounded-[14px] text-sm"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant={destructive ? "destructive" : "default"}
            className="h-11 flex-1 rounded-[14px] text-sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export type { ConfirmDialogProps };
export { ConfirmDialog };

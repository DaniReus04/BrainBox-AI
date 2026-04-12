import type * as React from "react";
import { useCallback, useEffect } from "react";

import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";

interface SkipConfirmDialogProps extends React.ComponentProps<"div"> {
  open: boolean;
  title: string;
  description: string;
  cancelLabel: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}

function Overlay({ onDismiss }: { onDismiss: () => void }) {
  return (
    <button
      type="button"
      className="fixed inset-0 z-40 animate-in fade-in duration-200 cursor-pointer bg-black/50 backdrop-blur-sm"
      onClick={onDismiss}
      aria-label="Close dialog"
      tabIndex={-1}
    />
  );
}

function SkipConfirmDialog({
  open,
  title,
  description,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  className,
  ...props
}: SkipConfirmDialogProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
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
    <div
      data-slot="skip-confirm-dialog-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <Overlay onDismiss={onCancel} />

      <div
        data-slot="skip-confirm-dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="skip-dialog-title"
        aria-describedby="skip-dialog-description"
        className={cn(
          "relative z-50 w-full max-w-xs animate-in fade-in zoom-in-95 duration-200 rounded-2xl bg-card p-6 shadow-xl",
          className,
        )}
        {...props}
      >
        <h3
          id="skip-dialog-title"
          className="mb-2 text-center text-base font-semibold text-foreground"
        >
          {title}
        </h3>
        <p
          id="skip-dialog-description"
          className="mb-6 text-center text-xs leading-relaxed text-muted-foreground"
        >
          {description}
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="lg"
            className="h-10 flex-1 cursor-pointer rounded-xl text-sm"
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="destructive"
            size="lg"
            className="h-10 flex-1 cursor-pointer rounded-xl text-sm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export type { SkipConfirmDialogProps };
export { SkipConfirmDialog };

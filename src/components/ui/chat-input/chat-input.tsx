import { PaperPlaneRight } from "@phosphor-icons/react";
import type * as React from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

interface ChatInputProps
  extends Omit<React.ComponentProps<"div">, "onSubmit" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  sendLabel?: string;
}

function ChatInput({
  value = "",
  onChange,
  onSubmit,
  placeholder,
  disabled = false,
  sendLabel,
  className,
  ...props
}: ChatInputProps) {
  const { t } = useTranslation();
  const resolvedPlaceholder = placeholder ?? t("chat.inputPlaceholder");
  const resolvedSendLabel = sendLabel ?? t("chat.sendMessage");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey && value.trim()) {
      e.preventDefault();
      onSubmit?.(value);
    }
  };

  return (
    <div
      data-slot="chat-input"
      className={cn(
        "flex items-center rounded-[10px] border border-border bg-secondary px-3 py-2",
        className,
      )}
      {...props}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={resolvedPlaceholder}
        disabled={disabled}
        className="w-full bg-transparent px-1 text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      <button
        type="button"
        onClick={() => value.trim() && onSubmit?.(value)}
        disabled={disabled || !value.trim()}
        aria-label={resolvedSendLabel}
        className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-[12px] bg-foreground text-background transition-opacity disabled:opacity-50"
      >
        <PaperPlaneRight size={18} weight="fill" />
      </button>
    </div>
  );
}

export type { ChatInputProps };
export { ChatInput };

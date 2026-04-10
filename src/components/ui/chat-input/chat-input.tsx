import { PaperPlaneRight } from "@phosphor-icons/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

interface ChatInputProps
  extends Omit<React.ComponentProps<"div">, "onSubmit" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function ChatInput({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Send a message...",
  disabled = false,
  className,
  ...props
}: ChatInputProps) {
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
        "flex items-center gap-3 border-t border-border bg-background px-4 py-3",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 items-center rounded-full bg-secondary px-4 py-2.5">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>
      <button
        type="button"
        onClick={() => value.trim() && onSubmit?.(value)}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-50"
      >
        <PaperPlaneRight size={18} weight="fill" />
      </button>
    </div>
  );
}

export type { ChatInputProps };
export { ChatInput };

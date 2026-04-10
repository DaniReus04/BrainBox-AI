import { CaretLeft } from "@phosphor-icons/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

interface HeaderProps extends React.ComponentProps<"header"> {
  title?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

function Header({
  title,
  onBack,
  rightAction,
  className,
  children,
  ...props
}: HeaderProps) {
  return (
    <header
      data-slot="header"
      className={cn(
        "flex h-14 items-center gap-3 bg-background px-4",
        className,
      )}
      {...props}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors hover:bg-muted/80"
          aria-label="Go back"
        >
          <CaretLeft size={20} weight="bold" />
        </button>
      )}
      {title && (
        <h1 className="flex-1 truncate text-base font-semibold">{title}</h1>
      )}
      {children}
      {rightAction && (
        <div className="flex shrink-0 items-center gap-1">{rightAction}</div>
      )}
    </header>
  );
}

export type { HeaderProps };
export { Header };

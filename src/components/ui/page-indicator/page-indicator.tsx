import type * as React from "react";

import { cn } from "@/lib/utils";

interface PageIndicatorProps extends React.ComponentProps<"div"> {
  total: number;
  current: number;
}

function PageIndicator({
  total,
  current,
  className,
  ...props
}: PageIndicatorProps) {
  return (
    <div
      data-slot="page-indicator"
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={`dot-${i.toString()}`}
          data-active={i === current}
          className={cn(
            "size-2 rounded-full transition-colors",
            i === current ? "bg-foreground" : "bg-muted-foreground/30",
          )}
        />
      ))}
    </div>
  );
}

export type { PageIndicatorProps };
export { PageIndicator };

import type * as React from "react";

import { cn } from "@/lib/utils";

interface BottomNavItem {
  icon: React.ReactNode;
  label: string;
}

interface BottomNavProps extends Omit<React.ComponentProps<"nav">, "onSelect"> {
  items: BottomNavItem[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
}

function BottomNav({
  items,
  activeIndex = 0,
  onSelect,
  className,
  ...props
}: BottomNavProps) {
  return (
    <nav
      data-slot="bottom-nav"
      className={cn(
        "flex items-center justify-around border-t border-border bg-background px-2 py-3",
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onSelect?.(index)}
          aria-label={item.label}
          aria-current={index === activeIndex ? "page" : undefined}
          className={cn(
            "inline-flex size-12 items-center justify-center rounded-xl transition-colors",
            index === activeIndex
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {item.icon}
        </button>
      ))}
    </nav>
  );
}

export type { BottomNavItem, BottomNavProps };
export { BottomNav };

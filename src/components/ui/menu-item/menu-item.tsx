import { CaretRight } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const menuItemVariants = cva(
  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors",
  {
    variants: {
      variant: {
        default: "text-foreground hover:bg-muted",
        destructive: "text-destructive hover:bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function MenuItem({
  icon,
  label,
  description,
  trailing,
  showChevron = true,
  variant = "default",
  className,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof menuItemVariants> & {
    icon?: React.ReactNode;
    label: string;
    description?: string;
    trailing?: React.ReactNode;
    showChevron?: boolean;
  }) {
  return (
    <button
      type="button"
      data-slot="menu-item"
      data-variant={variant}
      className={cn(menuItemVariants({ variant, className }))}
      {...props}
    >
      {icon && (
        <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
          {icon}
        </span>
      )}
      <div className="flex flex-1 flex-col items-start gap-0.5">
        <span className="font-medium">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
      {trailing}
      {showChevron && variant !== "destructive" && (
        <CaretRight size={16} className="shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}

export { MenuItem, menuItemVariants };

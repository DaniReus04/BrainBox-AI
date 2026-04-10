import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-12 text-sm",
        lg: "size-20 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function Avatar({
  src,
  alt = "",
  fallback,
  size = "md",
  bordered = false,
  className,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof avatarVariants> & {
    src?: string;
    alt?: string;
    fallback?: string;
    bordered?: boolean;
  }) {
  return (
    <div
      data-slot="avatar"
      className={cn(
        avatarVariants({ size, className }),
        bordered && "ring-2 ring-primary ring-offset-2 ring-offset-background",
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <span className="font-medium text-muted-foreground">
          {fallback ?? alt?.charAt(0)?.toUpperCase() ?? "?"}
        </span>
      )}
    </div>
  );
}

export { Avatar, avatarVariants };

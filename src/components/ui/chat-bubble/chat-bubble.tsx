import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const chatBubbleVariants = cva(
  "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
  {
    variants: {
      variant: {
        ai: "self-start rounded-tl-sm bg-secondary text-secondary-foreground",
        user: "self-end rounded-tr-sm bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "ai",
    },
  },
);

function ChatBubble({
  variant = "ai",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof chatBubbleVariants>) {
  return (
    <div
      data-slot="chat-bubble"
      data-variant={variant}
      className={cn(chatBubbleVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
}

export { ChatBubble, chatBubbleVariants };

import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertBannerVariants = cva(
  "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-sm",
  {
    variants: {
      variant: {
        success:
          "border-green-500/50 bg-green-500/10 text-green-800 dark:text-green-100",
        error: "border-destructive/50 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  },
);

interface AlertBannerProps extends VariantProps<typeof alertBannerVariants> {
  title: string;
  message: string;
  className?: string;
}

function AlertBanner({ title, message, variant, className }: AlertBannerProps) {
  const Icon = variant === "error" ? WarningCircle : CheckCircle;

  return (
    <div
      className={cn(alertBannerVariants({ variant }), className)}
      role="status"
      aria-live="polite"
    >
      <Icon className="mt-[2px] h-5 w-5 shrink-0" aria-hidden="true" />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold leading-tight">{title}</span>
        <span className="text-sm leading-tight text-foreground/80 dark:text-foreground/90">
          {message}
        </span>
      </div>
    </div>
  );
}

export { AlertBanner };

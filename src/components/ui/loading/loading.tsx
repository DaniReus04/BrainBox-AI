import type * as React from "react";
import { useTranslation } from "react-i18next";
import logoBlack from "@/assets/img/logo-black.png";
import logoWhite from "@/assets/img/logo-white.png";
import { cn } from "@/lib/utils";

function Loading({ className, ...props }: React.ComponentProps<"div">) {
  const { t } = useTranslation();

  return (
    <div
      data-slot="loading"
      className={cn(
        "flex min-h-dvh w-full flex-col items-center justify-center bg-[#ededed] text-[#111827] dark:bg-[#0d0f12] dark:text-white",
        className,
      )}
      {...props}
    >
      <div className="flex flex-1 items-center justify-center">
        <img
          src={logoBlack}
          alt="BrainBox logo"
          className="block h-24 w-auto animate-spin animation-duration-[2.5s] motion-reduce:animate-none dark:hidden"
        />
        <img
          src={logoWhite}
          alt=""
          aria-hidden="true"
          className="hidden h-24 w-auto animate-spin animation-duration-[2.5s] motion-reduce:animate-none dark:block"
        />
      </div>

      <div className="flex flex-col items-center gap-1 pb-12">
        <span className="text-xl font-semibold tracking-tight">BrainBox</span>
        <span className="text-xs opacity-50">{t("version")} 1.0</span>
      </div>
    </div>
  );
}

export { Loading };

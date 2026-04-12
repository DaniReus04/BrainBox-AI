import { Moon, Sun } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { getCurrentTheme, setTheme, type Theme } from "@/utils/theme";

interface ThemeToggleProps {
  className?: string;
}

function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setCurrentTheme] = useState<Theme>(getCurrentTheme);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("brainbox_theme")) {
        const next = e.matches ? "dark" : "light";
        setTheme(next);
        setCurrentTheme(next);
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = useCallback(() => {
    setAnimating(true);
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setCurrentTheme(next);
    setTimeout(() => setAnimating(false), 500);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "fixed left-5 top-5 z-30 flex size-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground md:left-8 md:top-8",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex transition-transform duration-500 ease-out",
          animating && "animate-spin",
        )}
        style={{ animationDuration: "500ms", animationIterationCount: "1" }}
      >
        {isDark ? (
          <Moon size={20} weight="bold" />
        ) : (
          <Sun size={20} weight="bold" />
        )}
      </span>
    </button>
  );
}

export { ThemeToggle };

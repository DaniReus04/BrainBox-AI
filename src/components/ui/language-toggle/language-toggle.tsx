import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
] as const;

const SHORT: Record<string, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

interface LanguageToggleProps {
  className?: string;
}

function LanguageToggle({ className }: LanguageToggleProps) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  const select = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
      setOpen(false);
    },
    [i18n],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const label = SHORT[i18n.language] ?? "EN";

  return (
    <div
      ref={containerRef}
      className={cn("fixed left-16 top-5 z-30 md:left-20 md:top-8", className)}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={`Change language, current: ${label}`}
        aria-expanded={open}
        className="flex size-9 cursor-pointer items-center justify-center rounded-full text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 min-w-[120px] animate-in fade-in slide-in-from-top-1 duration-150 rounded-xl border border-border bg-card p-1 shadow-lg">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => select(lang.code)}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-xs transition-colors",
                i18n.language === lang.code
                  ? "bg-muted font-semibold text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <span className="font-bold">{SHORT[lang.code]}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { LanguageToggle };

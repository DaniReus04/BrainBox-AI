import {
  ChatCircleDots,
  ClockCounterClockwise,
  House,
  PaperPlaneTilt,
  UserCircle,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import {
  type ChatThreadSummary,
  getRecentThreadSummaries,
} from "@/services/chat-history";

interface HomeNavItem {
  key: string;
  label: string;
  icon: typeof House;
  active: boolean;
  onClick?: () => void;
}

function formatRelativeDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function RecentChatsSection({
  chats,
  expanded,
  onToggle,
  onOpenChat,
}: {
  chats: ChatThreadSummary[];
  expanded: boolean;
  onToggle: () => void;
  onOpenChat: (threadId: string) => void;
}) {
  const { t, i18n } = useTranslation();
  const visibleChats = expanded ? chats : chats.slice(0, 3);
  const showToggle = chats.length > 3;

  if (chats.length === 0) {
    return (
      <section className="rounded-[24px] bg-card p-5 shadow-[0_12px_34px_rgba(0,0,0,0.05)] ring-1 ring-border/35 dark:shadow-[0_12px_34px_rgba(0,0,0,0.22)] dark:ring-white/8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {t("home.recentTitle")}
        </p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {t("home.recentEmpty")}
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[24px] bg-card p-5 shadow-[0_12px_34px_rgba(0,0,0,0.05)] ring-1 ring-border/35 dark:shadow-[0_12px_34px_rgba(0,0,0,0.22)] dark:ring-white/8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          {t("home.recentTitle")}
        </p>
        {showToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="text-xs font-medium text-foreground/70 transition-colors hover:text-foreground cursor-pointer"
          >
            {expanded ? t("home.seeLess") : t("home.seeAll")}
          </button>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {visibleChats.map((chat) => (
          <button
            key={chat.id}
            type="button"
            onClick={() => onOpenChat(chat.id)}
            className="flex w-full cursor-pointer items-start gap-3 rounded-[18px] bg-background/80 px-4 py-4 text-left transition-colors hover:bg-secondary"
          >
            <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-secondary text-foreground">
              <ChatCircleDots size={18} weight="fill" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="line-clamp-1 text-sm font-semibold text-foreground">
                  {chat.title}
                </p>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  {formatRelativeDate(chat.updatedAt, i18n.language)}
                </span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {chat.preview}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const recentChats = useMemo(() => getRecentThreadSummaries(), []);

  const navItems: HomeNavItem[] = [
    { key: "home", label: t("home.navHome"), icon: House, active: true },
    {
      key: "chats",
      label: t("home.navChats"),
      icon: ChatCircleDots,
      active: false,
      onClick: () => navigate("/chat/new"),
    },
    {
      key: "activity",
      label: t("home.navActivity"),
      icon: ClockCounterClockwise,
      active: false,
      onClick: () => navigate("/activity"),
    },
    {
      key: "profile",
      label: t("home.navProfile"),
      icon: UserCircle,
      active: false,
      onClick: () => navigate("/profile"),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="shrink-0 border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {t("home.branding")}
            </p>
            <h1 className="mt-1 text-lg font-semibold">
              {t("home.headerTitle")}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="static left-auto top-auto size-10 rounded-[12px] hover:text-foreground" />
            <LanguageToggle
              buttonClassName="size-10 rounded-[12px] text-[11px] font-semibold tracking-[0.12em]"
              menuClassName="right-0 left-auto"
            />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto pb-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-4 py-6 sm:px-6">
          <section className="rounded-[28px] bg-[linear-gradient(180deg,var(--color-card)_0%,color-mix(in_srgb,var(--color-card)_88%,var(--color-secondary))_100%)] p-6 shadow-[0_16px_44px_rgba(0,0,0,0.05)] dark:shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {t("home.heroEyebrow")}
            </p>
            <h2 className="mt-4 max-w-[16ch] text-4xl font-semibold tracking-tight text-balance">
              {t("home.heroTitle")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              {t("home.heroDescription")}
            </p>

            <Button
              type="button"
              onClick={() => navigate("/chat/new")}
              className="mt-7 h-12 rounded-[16px] bg-foreground px-5 text-sm font-semibold text-background hover:bg-foreground/90 cursor-pointer"
            >
              <PaperPlaneTilt size={18} weight="fill" />
              {t("home.primaryAction")}
            </Button>
          </section>

          <section className="rounded-[24px] bg-card p-5 shadow-[0_12px_34px_rgba(0,0,0,0.05)] ring-1 ring-border/35 dark:shadow-[0_12px_34px_rgba(0,0,0,0.22)] dark:ring-white/8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {t("home.aboutEyebrow")}
            </p>
            <h3 className="mt-3 text-xl font-semibold">
              {t("home.aboutTitle")}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {t("home.aboutDescription")}
            </p>
          </section>

          <RecentChatsSection
            chats={recentChats}
            expanded={expanded}
            onToggle={() => setExpanded((value) => !value)}
            onOpenChat={(threadId) => navigate(`/chat/new?thread=${threadId}`)}
          />
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-around px-2 py-3">
          {navItems.map(({ key, label, icon: Icon, active, onClick }) => (
            <button
              key={key}
              type="button"
              onClick={onClick}
              aria-current={active ? "page" : undefined}
              aria-label={label}
              className={cn(
                "flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] transition-colors cursor-pointer",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon size={22} weight={active ? "fill" : "regular"} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </main>
  );
}

export { HomePage };

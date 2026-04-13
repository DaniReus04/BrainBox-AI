import {
  CaretLeft,
  ChatCircleDots,
  ClockCounterClockwise,
  House,
  Trash,
  UserCircle,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import {
  type ChatThreadSummary,
  deleteStoredThread,
  getRecentThreadSummaries,
} from "@/services/chat-history";

interface ActivityNavItem {
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

function ActivityPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [chats, setChats] = useState<ChatThreadSummary[]>(() =>
    getRecentThreadSummaries(),
  );
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const navItems: ActivityNavItem[] = useMemo(
    () => [
      {
        key: "home",
        label: t("home.navHome"),
        icon: House,
        active: false,
        onClick: () => navigate("/home"),
      },
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
        active: true,
      },
      {
        key: "profile",
        label: t("home.navProfile"),
        icon: UserCircle,
        active: false,
      },
    ],
    [t, navigate],
  );

  const handleDelete = (threadId: string) => {
    deleteStoredThread(threadId);
    setChats((prev) => prev.filter((c) => c.id !== threadId));
    setDeleteTarget(null);
  };

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative z-30 shrink-0 border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[12px] bg-secondary text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            aria-label={t("chat.backToHome")}
          >
            <CaretLeft size={18} weight="bold" />
          </button>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              {t("home.branding")}
            </p>
            <h1 className="mt-0.5 text-base font-semibold">
              {t("activity.headerTitle")}
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

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-6 sm:px-6">
          {chats.length === 0 ? (
            <section className="flex flex-1 flex-col items-center justify-center py-20 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-secondary">
                <ClockCounterClockwise
                  size={28}
                  className="text-muted-foreground"
                />
              </div>
              <h2 className="mt-5 text-lg font-semibold">
                {t("activity.emptyTitle")}
              </h2>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                {t("activity.emptyDescription")}
              </p>
            </section>
          ) : (
            <section className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {t("activity.listTitle")}
              </p>

              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-start gap-3 rounded-[18px] bg-card p-4 shadow-[0_4px_18px_rgba(0,0,0,0.04)] ring-1 ring-border/35 transition-colors hover:bg-secondary/50 dark:shadow-[0_4px_18px_rgba(0,0,0,0.18)] dark:ring-white/8"
                >
                  <button
                    type="button"
                    onClick={() => navigate(`/chat/new?thread=${chat.id}`)}
                    className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left"
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

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(chat.id)}
                    aria-label={t("activity.deleteLabel")}
                    className="mt-1 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </section>
          )}
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
                "flex min-w-16 cursor-pointer flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[11px] transition-colors",
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

      <ConfirmDialog
        open={deleteTarget !== null}
        title={t("activity.deleteDialogTitle")}
        description={t("activity.deleteConfirm")}
        cancelLabel={t("activity.deleteCancel")}
        confirmLabel={t("activity.deleteConfirmAction")}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        destructive
      />
    </main>
  );
}

export { ActivityPage };

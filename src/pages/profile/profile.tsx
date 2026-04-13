import {
  CaretLeft,
  CaretRight,
  ChatCircleDots,
  ClockCounterClockwise,
  Gear,
  Headset,
  House,
  ShieldCheck,
  SignOut,
  UserCircle,
} from "@phosphor-icons/react";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import robotImage from "@/assets/img/robot-image.png";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

interface NavItem {
  key: string;
  label: string;
  icon: typeof House;
  active: boolean;
  onClick?: () => void;
}

const SECURITY_SCORE = 85;

function SecurityBar({ score }: { score: number }) {
  const { t } = useTranslation();

  const label =
    score >= 80
      ? t("profile.securityExcellent")
      : score >= 50
        ? t("profile.securityGood")
        : t("profile.securityWeak");

  const color =
    score >= 80 ? "bg-green-500" : score >= 50 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  const menuItems = useMemo(
    () => [
      {
        key: "preferences",
        icon: Gear,
        label: t("profile.preferences"),
        onClick: () => navigate("/preferences"),
        trailing: <CaretRight size={16} className="text-muted-foreground" />,
      },
      {
        key: "security",
        icon: ShieldCheck,
        label: t("profile.accountSecurity"),
        onClick: () => {},
        trailing: <SecurityBar score={SECURITY_SCORE} />,
      },
      {
        key: "support",
        icon: Headset,
        label: t("profile.customerSupport"),
        onClick: () => {},
        trailing: <CaretRight size={16} className="text-muted-foreground" />,
      },
      {
        key: "logout",
        icon: SignOut,
        label: t("profile.logout"),
        destructive: true,
        onClick: () => setShowLogoutDialog(true),
      },
    ],
    [t, navigate],
  );

  const navItems: NavItem[] = useMemo(
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
        active: false,
        onClick: () => navigate("/activity"),
      },
      {
        key: "profile",
        label: t("home.navProfile"),
        icon: UserCircle,
        active: true,
      },
    ],
    [t, navigate],
  );

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
          <h1 className="flex-1 text-base font-semibold">
            {t("profile.title")}
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar pb-28">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-8 sm:px-6">
          <div className="flex flex-col items-center">
            <div className="relative size-20 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-background">
              <img
                src={robotImage}
                alt="Avatar"
                className="size-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-lg font-semibold">
              {user?.fullName ?? "User"}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {user?.email ?? "user@email.com"}
            </p>
          </div>

          <nav className="mt-8 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={item.onClick}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-4 py-3.5 text-left transition-colors",
                  item.destructive
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-foreground hover:bg-secondary",
                )}
              >
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full",
                    item.destructive ? "bg-destructive/10" : "bg-secondary",
                  )}
                >
                  <item.icon size={18} weight="regular" />
                </div>
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                {item.trailing}
              </button>
            ))}
          </nav>
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
        open={showLogoutDialog}
        title={t("profile.logoutDialogTitle")}
        description={t("profile.logoutDialogDescription")}
        cancelLabel={t("profile.logoutCancel")}
        confirmLabel={t("profile.logoutConfirm")}
        onCancel={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        destructive
      />
    </main>
  );
}

export { ProfilePage };

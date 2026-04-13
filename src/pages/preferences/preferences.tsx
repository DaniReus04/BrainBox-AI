import {
  CaretLeft,
  CaretRight,
  CreditCard,
  Key,
  UserCircle as UserIcon,
  UsersThree,
} from "@phosphor-icons/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

function PreferencesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => [
      {
        key: "account",
        icon: UserIcon,
        label: t("preferences.accountInfo"),
        description: t("preferences.accountInfoDesc"),
        onClick: () => navigate("/edit-information"),
      },
      {
        key: "password",
        icon: Key,
        label: t("preferences.password"),
        description: t("preferences.passwordDesc"),
        onClick: () => navigate("/change-password"),
      },
      {
        key: "payment",
        icon: CreditCard,
        label: t("preferences.paymentMethods"),
        description: t("preferences.paymentMethodsDesc"),
        onClick: () => {},
      },
      {
        key: "invite",
        icon: UsersThree,
        label: t("preferences.inviteFriends"),
        description: t("preferences.inviteFriendsDesc"),
        onClick: () => navigate("/invite-friend"),
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
            onClick={() => navigate("/profile")}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[12px] bg-secondary text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            aria-label={t("preferences.back")}
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <h1 className="flex-1 text-base font-semibold">
            {t("preferences.title")}
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto flex w-full max-w-3xl flex-col px-4 py-6 sm:px-6">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={item.onClick}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-[14px] px-4 py-3.5 text-left transition-colors hover:bg-secondary",
                )}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <item.icon size={18} weight="regular" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <CaretRight
                  size={16}
                  className="shrink-0 text-muted-foreground"
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}

export { PreferencesPage };

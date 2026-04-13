import { CaretLeft, Check, Copy } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import illustrationBlack from "@/assets/img/illustration-black.png";
import illustrationWhite from "@/assets/img/illustration-white.png";

const MOCK_REFERRAL_CODE = "BrainAIPartnerMR";

function InviteFriendPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(MOCK_REFERRAL_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative z-30 shrink-0 border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/preferences")}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[12px] bg-secondary text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            aria-label={t("invite.back")}
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <h1 className="flex-1 text-base font-semibold">
            {t("invite.title")}
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-12 sm:px-6">
          <div className="flex size-28 items-center justify-center">
            <img
              src={illustrationBlack}
              alt=""
              aria-hidden="true"
              className="h-24 w-auto object-contain dark:hidden"
            />
            <img
              src={illustrationWhite}
              alt=""
              aria-hidden="true"
              className="hidden h-24 w-auto object-contain dark:block"
            />
          </div>

          <h2 className="mt-6 text-xl font-semibold">
            {t("invite.referTitle")}
          </h2>
          <p className="mt-2 max-w-xs text-center text-sm leading-6 text-muted-foreground">
            {t("invite.referDescription")}
          </p>

          <div className="mt-8 flex w-full max-w-sm items-center gap-2 rounded-[14px] border border-border bg-card px-4 py-3">
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">
              {MOCK_REFERRAL_CODE}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={t("invite.copyCode")}
              className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {copied ? (
                <Check size={16} className="text-green-500" />
              ) : (
                <Copy size={16} />
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export { InviteFriendPage };

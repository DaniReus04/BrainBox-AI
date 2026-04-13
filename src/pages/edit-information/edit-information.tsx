import { CaretLeft, PencilSimple } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { pushAlert } from "@/components/ui/alert-banner/alert-bus";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { editInfoSchema } from "./schema";

interface FormErrors {
  fullName?: string;
  email?: string;
}

function EditInformationPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, setUser } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const initialName = user?.fullName ?? "";
  const initialEmail = user?.email ?? "";
  const hasChanges =
    fullName.trim() !== initialName || email.trim() !== initialEmail;

  const handleSave = useCallback(async () => {
    setErrors({});

    try {
      await editInfoSchema.validate({ fullName, email }, { abortEarly: false });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: FormErrors = {};
        for (const inner of err.inner) {
          if (inner.path && !fieldErrors[inner.path as keyof FormErrors]) {
            const key = inner.message;
            fieldErrors[inner.path as keyof FormErrors] = t(key);
          }
        }
        setErrors(fieldErrors);
        return;
      }
    }

    if (!hasChanges) return;

    setSaving(true);

    await new Promise((r) => setTimeout(r, 600));

    if (user) {
      setUser({ ...user, fullName: fullName.trim(), email: email.trim() });
    }

    pushAlert({
      variant: "success",
      title: t("editInfo.successTitle"),
      message: t("editInfo.successMessage"),
    });

    setSaving(false);
  }, [fullName, email, hasChanges, user, setUser, t]);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative z-30 shrink-0 border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/preferences")}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[12px] bg-secondary text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            aria-label={t("editInfo.back")}
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <h1 className="flex-1 text-base font-semibold">
            {t("editInfo.title")}
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8 sm:px-6">
          <FieldRow
            label={t("editInfo.fullName")}
            value={fullName}
            onChange={setFullName}
            error={errors.fullName}
          />
          <FieldRow
            label={t("editInfo.email")}
            value={email}
            onChange={setEmail}
            type="email"
            error={errors.email}
          />
          <Button
            type="button"
            onClick={handleSave}
            disabled={
              !hasChanges || !fullName.trim() || !email.trim() || saving
            }
            className="mt-4 h-12 w-full cursor-pointer rounded-[14px] bg-foreground text-sm font-semibold text-background transition-opacity disabled:opacity-50 hover:bg-foreground/90"
          >
            {saving ? t("editInfo.saving") : t("editInfo.saveChanges")}
          </Button>
        </div>
      </div>
    </main>
  );
}

function FieldRow({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 rounded-[14px] border bg-card px-4 py-3",
          error ? "border-destructive" : "border-border",
        )}
      >
        <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-right text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <PencilSimple size={14} className="shrink-0 text-muted-foreground" />
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export { EditInformationPage };

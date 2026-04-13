import { CaretLeft, Eye, EyeSlash } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { pushAlert } from "@/components/ui/alert-banner/alert-bus";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { changePasswordUser } from "@/services/auth";
import { changePasswordSchema } from "./schema";

interface FormErrors {
  currentPassword?: string;
  password?: string;
  confirmPassword?: string;
}

function ChangePasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPasswordState] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [confirmOpen, setConfirmOpen] = useState(false);

  const validateForm = useCallback(async (): Promise<boolean> => {
    setErrors({});
    try {
      await changePasswordSchema.validate(
        { currentPassword, password, confirmPassword },
        { abortEarly: false },
      );
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const fieldErrors: FormErrors = {};
        for (const inner of err.inner) {
          if (inner.path && !fieldErrors[inner.path as keyof FormErrors]) {
            fieldErrors[inner.path as keyof FormErrors] = t(inner.message);
          }
        }
        setErrors(fieldErrors);
      }
      return false;
    }
  }, [currentPassword, password, confirmPassword, t]);

  const handleSaveClick = useCallback(async () => {
    const valid = await validateForm();
    if (valid) setConfirmOpen(true);
  }, [validateForm]);

  const handleConfirm = useCallback(async () => {
    if (!user) return;
    setConfirmOpen(false);
    setSaving(true);
    try {
      await changePasswordUser({
        userId: user.id,
        currentPassword,
        newPassword: password,
      });
      pushAlert({
        variant: "success",
        title: t("changePassword.successTitle"),
        message: t("changePassword.successMessage"),
      });
      setTimeout(() => {
        logout();
        navigate("/login", { replace: true });
      }, 800);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number } };
      if (axiosErr.response?.status === 401) {
        setErrors({
          currentPassword: t("changePassword.currentPasswordInvalid"),
        });
      } else {
        pushAlert({
          variant: "error",
          title: t("auth.genericError"),
          message: t("auth.genericError"),
        });
      }
    } finally {
      setSaving(false);
    }
  }, [currentPassword, password, user, t, logout, navigate]);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="relative z-30 shrink-0 border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate("/preferences")}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-[12px] bg-secondary text-foreground shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
            aria-label={t("changePassword.back")}
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <h1 className="flex-1 text-base font-semibold">
            {t("changePassword.title")}
          </h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-8 sm:px-6">
          <FieldRow
            label={t("changePassword.currentPassword")}
            value={currentPassword}
            onChange={setCurrentPassword}
            error={errors.currentPassword}
            showPassword={showCurrentPassword}
            onTogglePassword={() => setShowCurrentPassword((p) => !p)}
          />
          <FieldRow
            label={t("changePassword.newPassword")}
            value={password}
            onChange={setPasswordState}
            error={errors.password}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((p) => !p)}
          />
          <FieldRow
            label={t("changePassword.confirmPassword")}
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword((p) => !p)}
          />

          <Button
            type="button"
            onClick={handleSaveClick}
            disabled={saving}
            className="mt-2 h-12 w-full cursor-pointer rounded-[14px] bg-foreground text-sm font-semibold text-background transition-opacity disabled:opacity-50 hover:bg-foreground/90"
          >
            {saving ? t("changePassword.saving") : t("changePassword.save")}
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={t("changePassword.confirmTitle")}
        description={t("changePassword.confirmDescription")}
        cancelLabel={t("changePassword.confirmCancel")}
        confirmLabel={t("changePassword.confirmAction")}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </main>
  );
}

function FieldRow({
  label,
  value,
  onChange,
  error,
  showPassword,
  onTogglePassword,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}) {
  return (
    <div className={cn("flex flex-col gap-2")}>
      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </span>
      <div
        className={cn(
          "flex h-12 items-center rounded-[14px] border bg-card px-4",
          error ? "border-destructive" : "border-border",
        )}
      >
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        {onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="ml-2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlash size={20} weight="bold" />
            ) : (
              <Eye size={20} weight="bold" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export { ChangePasswordPage };

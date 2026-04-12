import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import logoBlack from "@/assets/img/logo-black.png";
import logoWhite from "@/assets/img/logo-white.png";
import { pushAlert } from "@/components/ui/alert-banner/alert-bus";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { registerUser } from "@/services/auth";
import { registerSchema } from "./schema";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      try {
        await registerSchema.validate(
          { fullName, email, password, confirmPassword },
          { abortEarly: false },
        );
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

      setLoading(true);
      try {
        await registerUser(fullName, email, password);
        pushAlert({
          variant: "success",
          title: t("auth.registerSuccessTitle"),
          message: t("auth.registerSuccess"),
        });
        setTimeout(() => navigate("/login", { replace: true }), 600);
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status?: number } };
        if (axiosErr.response?.status === 409) {
          pushAlert({
            variant: "error",
            title: t("auth.genericError"),
            message: t("auth.emailExists"),
          });
        } else {
          pushAlert({
            variant: "error",
            title: t("auth.genericError"),
            message: t("auth.genericError"),
          });
        }
      } finally {
        setLoading(false);
      }
    },
    [fullName, email, password, confirmPassword, navigate, t],
  );

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-6">
      <ThemeToggle />
      <LanguageToggle />

      <div className="flex w-full max-w-sm flex-col items-center">
        <img
          src={logoBlack}
          alt="BrainBox logo"
          className="block h-20 w-auto dark:hidden"
        />
        <img
          src={logoWhite}
          alt=""
          aria-hidden="true"
          className="hidden h-20 w-auto dark:block"
        />
        <h1 className="mb-1 text-2xl font-bold text-foreground">
          {t("auth.registerTitle")}
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t("auth.registerSubtitle")}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full flex-col gap-4"
        >
          <div>
            <div
              className={cn(
                "flex h-12 items-center rounded-xl border bg-secondary px-4",
                errors.fullName ? "border-destructive" : "border-border",
              )}
            >
              <input
                type="text"
                placeholder={t("auth.fullName")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "register-fullname-error" : undefined
                }
              />
            </div>
            {errors.fullName && (
              <p
                id="register-fullname-error"
                className="mt-1 text-xs text-destructive"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <div
              className={cn(
                "flex h-12 items-center rounded-xl border bg-secondary px-4",
                errors.email ? "border-destructive" : "border-border",
              )}
            >
              <input
                type="email"
                placeholder={t("auth.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "register-email-error" : undefined
                }
              />
            </div>
            {errors.email && (
              <p
                id="register-email-error"
                className="mt-1 text-xs text-destructive"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <div
              className={cn(
                "flex h-12 items-center rounded-xl border bg-secondary px-4",
                errors.password ? "border-destructive" : "border-border",
              )}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "register-password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="ml-2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlash size={20} weight="bold" />
                ) : (
                  <Eye size={20} weight="bold" />
                )}
              </button>
            </div>
            {errors.password && (
              <p
                id="register-password-error"
                className="mt-1 text-xs text-destructive"
              >
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <div
              className={cn(
                "flex h-12 items-center rounded-xl border bg-secondary px-4",
                errors.confirmPassword ? "border-destructive" : "border-border",
              )}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t("auth.confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? "register-confirm-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="ml-2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeSlash size={20} weight="bold" />
                ) : (
                  <Eye size={20} weight="bold" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p
                id="register-confirm-error"
                className="mt-1 text-xs text-destructive"
              >
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full cursor-pointer rounded-xl bg-foreground font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "..." : t("auth.register")}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          {t("auth.hasAccount")}{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-foreground underline-offset-2 hover:underline"
          >
            {t("auth.login")}
          </button>
        </p>
      </div>
    </div>
  );
}

export { RegisterPage };

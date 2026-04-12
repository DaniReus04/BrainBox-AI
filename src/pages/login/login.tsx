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
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { loginUser } from "@/services/auth";
import { loginSchema } from "./schema";

interface FormErrors {
  email?: string;
  password?: string;
}

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setErrors({});

      try {
        await loginSchema.validate({ email, password }, { abortEarly: false });
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
        const { user, token: _token } = await loginUser(email, password);
        setUser(user);
        pushAlert({
          variant: "success",
          title: t("auth.login"),
          message: t("auth.loginSuccess"),
        });
        setTimeout(() => {
          if (!user.onboardingDone) {
            navigate("/onboarding", { replace: true });
          } else {
            navigate("/home", { replace: true });
          }
        }, 600);
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status?: number } };
        if (axiosErr.response?.status === 401) {
          pushAlert({
            variant: "error",
            title: t("auth.genericError"),
            message: t("auth.invalidCredentials"),
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
    [email, password, navigate, setUser, t],
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
          {t("auth.welcomeTitle")}
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t("auth.welcomeSubtitle")}
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
                  errors.email ? "login-email-error" : undefined
                }
              />
            </div>
            {errors.email && (
              <p
                id="login-email-error"
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
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "login-password-error" : undefined
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
                id="login-password-error"
                className="mt-1 text-xs text-destructive"
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full cursor-pointer rounded-xl bg-foreground font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "..." : t("auth.login")}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground">
          {t("auth.noAccount")}{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="cursor-pointer font-semibold text-foreground underline-offset-2 hover:underline"
          >
            {t("auth.register")}
          </button>
        </p>
      </div>
    </div>
  );
}

export { LoginPage };

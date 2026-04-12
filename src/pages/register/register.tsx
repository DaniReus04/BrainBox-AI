import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import logoBlack from "@/assets/img/logo-black.png";
import logoWhite from "@/assets/img/logo-white.png";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { registerUser } from "@/services/auth";
import { getCurrentTheme } from "@/utils/theme";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
}

function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    fullName: yup.string().required(t("auth.fullNameRequired")),
    email: yup
      .string()
      .required(t("auth.emailRequired"))
      .email(t("auth.emailInvalid")),
    password: yup
      .string()
      .required(t("auth.passwordRequired"))
      .min(6, t("auth.passwordMin")),
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setApiError("");
      setErrors({});

      try {
        await schema.validate(
          { fullName, email, password },
          { abortEarly: false },
        );
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const fieldErrors: FormErrors = {};
          for (const inner of err.inner) {
            if (inner.path && !fieldErrors[inner.path as keyof FormErrors]) {
              fieldErrors[inner.path as keyof FormErrors] = inner.message;
            }
          }
          setErrors(fieldErrors);
          return;
        }
      }

      setLoading(true);
      try {
        await registerUser(fullName, email, password);
        navigate("/login", { replace: true });
      } catch (err: unknown) {
        const axiosErr = err as { response?: { status?: number } };
        if (axiosErr.response?.status === 409) {
          setApiError(t("auth.emailExists"));
        } else {
          setApiError(t("auth.genericError"));
        }
      } finally {
        setLoading(false);
      }
    },
    [fullName, email, password, schema, navigate, t],
  );

  const isDark = getCurrentTheme() === "dark";

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background px-6">
      <ThemeToggle />
      <LanguageToggle />

      <div className="flex w-full max-w-sm flex-col items-center">
        <img
          src={isDark ? logoWhite : logoBlack}
          alt="BrainBox AI"
          className="mb-4 h-16 w-auto"
        />
        <h1 className="mb-1 text-2xl font-bold text-foreground">
          {t("auth.registerTitle")}
        </h1>
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t("auth.registerSubtitle")}
        </p>

        {apiError && (
          <div className="mb-4 w-full rounded-xl bg-destructive/10 px-4 py-3 text-center text-sm font-medium text-destructive">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div>
            <div className="flex h-12 items-center rounded-xl border border-border bg-secondary px-4">
              <input
                type="text"
                placeholder={t("auth.fullName")}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="name"
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-destructive">{errors.fullName}</p>
            )}
          </div>

          <div>
            <div className="flex h-12 items-center rounded-xl border border-border bg-secondary px-4">
              <input
                type="email"
                placeholder={t("auth.email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          <div>
            <div className="flex h-12 items-center rounded-xl border border-border bg-secondary px-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("auth.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                autoComplete="new-password"
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
              <p className="mt-1 text-xs text-destructive">{errors.password}</p>
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

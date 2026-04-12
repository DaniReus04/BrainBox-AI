import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { Loading } from "@/components/ui/loading";

const SplashPage = lazy(() =>
  import("@/pages/splash").then((m) => ({ default: m.SplashPage })),
);

const LoginPage = lazy(() =>
  import("@/pages/login").then((m) => ({ default: m.LoginPage })),
);

const RegisterPage = lazy(() =>
  import("@/pages/register").then((m) => ({ default: m.RegisterPage })),
);

const OnboardingPage = lazy(() =>
  import("@/pages/onboarding").then((m) => ({ default: m.OnboardingPage })),
);

const HomePage = lazy(() =>
  import("@/pages/home").then((m) => ({ default: m.HomePage })),
);

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <SplashPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/login",
    element: (
      <SuspenseWrapper>
        <LoginPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/register",
    element: (
      <SuspenseWrapper>
        <RegisterPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <SuspenseWrapper>
        <OnboardingPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/home",
    element: (
      <SuspenseWrapper>
        <HomePage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

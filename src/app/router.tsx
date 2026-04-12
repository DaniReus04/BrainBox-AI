import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { Loading } from "@/components/ui/loading";
import { WithAuth } from "@/hoc/with-auth";
import { WithoutAuth } from "@/hoc/without-auth";

const LoginPage = lazy(() =>
  import("@/pages/login").then((m) => ({ default: m.LoginPage })),
);

const RegisterPage = lazy(() =>
  import("@/pages/register").then((m) => ({ default: m.RegisterPage })),
);

const SplashPage = lazy(() =>
  import("@/pages/splash").then((m) => ({ default: m.SplashPage })),
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
        <WithoutAuth>
          <LoginPage />
        </WithoutAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/register",
    element: (
      <SuspenseWrapper>
        <WithoutAuth>
          <RegisterPage />
        </WithoutAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <OnboardingPage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/home",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <HomePage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

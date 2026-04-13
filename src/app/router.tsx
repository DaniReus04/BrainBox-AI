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

const ChatPage = lazy(() =>
  import("@/pages/chat").then((m) => ({ default: m.ChatPage })),
);

const ActivityPage = lazy(() =>
  import("@/pages/activity").then((m) => ({ default: m.ActivityPage })),
);

const ProfilePage = lazy(() =>
  import("@/pages/profile").then((m) => ({ default: m.ProfilePage })),
);

const PreferencesPage = lazy(() =>
  import("@/pages/preferences").then((m) => ({ default: m.PreferencesPage })),
);

const EditInformationPage = lazy(() =>
  import("@/pages/edit-information").then((m) => ({
    default: m.EditInformationPage,
  })),
);

const ChangePasswordPage = lazy(() =>
  import("@/pages/change-password").then((m) => ({
    default: m.ChangePasswordPage,
  })),
);

const InviteFriendPage = lazy(() =>
  import("@/pages/invite-friend").then((m) => ({
    default: m.InviteFriendPage,
  })),
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
    path: "/activity",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <ActivityPage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/profile",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <ProfilePage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/preferences",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <PreferencesPage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/edit-information",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <EditInformationPage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/change-password",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <ChangePasswordPage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/invite-friend",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <InviteFriendPage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "/chat/new",
    element: (
      <SuspenseWrapper>
        <WithAuth>
          <ChatPage />
        </WithAuth>
      </SuspenseWrapper>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

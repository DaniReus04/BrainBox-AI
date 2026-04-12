import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/context/auth-context";

interface WithoutAuthProps {
  children: React.ReactElement;
}

function WithoutAuth({ children }: WithoutAuthProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (user) {
    const target = user.onboardingDone ? "/home" : "/onboarding";
    return <Navigate to={target} replace state={{ from: location }} />;
  }

  return children;
}

export { WithoutAuth };

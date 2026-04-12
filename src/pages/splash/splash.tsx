import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "@/components/ui/loading";
import type { AuthUser } from "@/services/auth";
import { getCookie, removeCookie } from "@/utils/cookies";

const SESSION_COOKIE = "brainbox_session";
const SPLASH_DURATION = 2500;

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const session = getCookie(SESSION_COOKIE);
      if (session) {
        try {
          const user = JSON.parse(session) as AuthUser;
          if (!user.onboardingDone) {
            navigate("/onboarding", { replace: true });
          } else {
            navigate("/home", { replace: true });
          }
        } catch {
          removeCookie(SESSION_COOKIE);
          navigate("/login", { replace: true });
        }
      } else {
        navigate("/login", { replace: true });
      }
    }, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <Loading />;
}

export { SplashPage };

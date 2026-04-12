import "@/mocks/onboarding.mock";
import "./App.css";

import { useCallback, useEffect, useState } from "react";

import { Loading } from "./components/ui/loading";
import { ONBOARDING_COOKIE, Onboarding } from "./features/onboarding";
import { getCookie } from "./utils/cookies";

type AppScreen = "splash" | "onboarding" | "home";

const SPLASH_DURATION = 2500;

function App() {
  const [screen, setScreen] = useState<AppScreen>("splash");

  useEffect(() => {
    const timer = setTimeout(() => {
      const cookie = getCookie(ONBOARDING_COOKIE);
      setScreen(cookie ? "home" : "onboarding");
    }, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = useCallback(() => {
    setScreen("home");
  }, []);

  if (screen === "splash") {
    return <Loading />;
  }

  if (screen === "onboarding") {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background text-foreground">
      <p className="text-lg font-semibold">Home — Coming soon</p>
    </div>
  );
}

export default App;

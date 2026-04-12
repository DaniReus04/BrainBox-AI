import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { AuthUser } from "@/services/auth";
import { getCookie, removeCookie, setCookie } from "@/utils/cookies";

const SESSION_COOKIE = "brainbox_session";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const session = getCookie(SESSION_COOKIE);
      if (session) {
        const parsed = JSON.parse(session) as AuthUser;
        setUser(parsed);
      }
    } catch {
      removeCookie(SESSION_COOKIE);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeCookie(SESSION_COOKIE);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser: (u: AuthUser | null) => {
        if (u) setCookie(SESSION_COOKIE, JSON.stringify(u));
        else removeCookie(SESSION_COOKIE);
        setUser(u);
      },
      logout,
    }),
    [user, loading, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { AuthProvider, SESSION_COOKIE, useAuth };

import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "./context/auth-context";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/login";
import { SplashPage } from "./pages/splash";

const SESSION_COOKIE = "brainbox_session";

vi.mock("@/services/onboarding", () => ({
  saveOnboardingStatus: vi
    .fn()
    .mockResolvedValue({ status: "completed", completedAt: "" }),
}));

vi.mock("@/services/auth", () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
  markOnboardingDone: vi.fn().mockResolvedValue({ success: true }),
}));

function renderApp(initialRoute = "/") {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/" element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  );
}

describe("App", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // biome-ignore lint/suspicious/noDocumentCookie: test setup requires direct cookie manipulation
    document.cookie = `${SESSION_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render the splash screen initially", () => {
    renderApp("/");
    expect(screen.getByText("BrainBox")).toBeInTheDocument();
  });

  it("should show login after splash when no session", async () => {
    renderApp("/");
    await act(() => vi.advanceTimersByTime(3000));
    vi.useRealTimers();
    await waitFor(() => {
      expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    });
  });

  it("should go to home when session exists with onboarding done", async () => {
    const user = JSON.stringify({
      id: "1",
      fullName: "Test",
      email: "t@t.com",
      onboardingDone: true,
    });
    // biome-ignore lint/suspicious/noDocumentCookie: test setup requires direct cookie manipulation
    document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(user)}; path=/`;
    renderApp("/");
    await act(() => vi.advanceTimersByTime(3000));
    vi.useRealTimers();
    await waitFor(() => {
      expect(screen.getByText("Home — Coming soon")).toBeInTheDocument();
    });
  });
});

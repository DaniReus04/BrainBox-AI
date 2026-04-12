import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AlertHost } from "@/components/ui/alert-banner/alert-bus";
import { AuthProvider } from "@/context/auth-context";
import { LoginPage } from "./login";

const mockLoginUser = vi.fn();

vi.mock("@/services/auth", () => ({
  loginUser: (...args: unknown[]) => mockLoginUser(...args),
}));

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <AuthProvider>
        <LoginPage />
        <AlertHost />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render login form", () => {
    renderLogin();
    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    renderLogin();
    fireEvent.click(screen.getByText("Sign In"));
    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should toggle password visibility", () => {
    renderLogin();
    const input = screen.getByPlaceholderText("Password");
    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(screen.getByLabelText("Show password"));
    expect(input).toHaveAttribute("type", "text");
    fireEvent.click(screen.getByLabelText("Hide password"));
    expect(input).toHaveAttribute("type", "password");
  });

  it("should call loginUser on valid submit", async () => {
    const user = {
      id: "1",
      fullName: "Test",
      email: "test@test.com",
      onboardingDone: false,
    };
    mockLoginUser.mockResolvedValueOnce({ user, token: "tok" });
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Abcd!1234" },
    });
    fireEvent.click(screen.getByText("Sign In"));
    await waitFor(() =>
      expect(mockLoginUser).toHaveBeenCalledWith("test@test.com", "Abcd!1234"),
    );
  });

  it("should show error for invalid credentials", async () => {
    mockLoginUser.mockRejectedValueOnce({ response: { status: 401 } });
    renderLogin();
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Abcd!1234" },
    });
    fireEvent.click(screen.getByText("Sign In"));
    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });

  it("should have link to register", () => {
    renderLogin();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });
});

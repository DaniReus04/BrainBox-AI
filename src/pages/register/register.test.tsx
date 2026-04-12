import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RegisterPage } from "./register";

const mockRegisterUser = vi.fn();

vi.mock("@/services/auth", () => ({
  registerUser: (...args: unknown[]) => mockRegisterUser(...args),
}));

function renderRegister() {
  return render(
    <MemoryRouter initialEntries={["/register"]}>
      <RegisterPage />
    </MemoryRouter>,
  );
}

describe("RegisterPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render register form", () => {
    renderRegister();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    renderRegister();
    fireEvent.click(screen.getByText("Sign Up"));
    await waitFor(() => {
      expect(screen.getByText("Full name is required")).toBeInTheDocument();
      expect(screen.getByText("Email is required")).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm password is required"),
      ).toBeInTheDocument();
    });
  });

  it("should call registerUser on valid submit", async () => {
    mockRegisterUser.mockResolvedValueOnce({
      id: "1",
      fullName: "John",
      email: "john@test.com",
    });
    renderRegister();
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Abcd!1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "Abcd!1234" },
    });
    fireEvent.click(screen.getByText("Sign Up"));
    await waitFor(() =>
      expect(mockRegisterUser).toHaveBeenCalledWith(
        "John",
        "john@test.com",
        "Abcd!1234",
      ),
    );
  });

  it("should show error for duplicate email", async () => {
    mockRegisterUser.mockRejectedValueOnce({ response: { status: 409 } });
    renderRegister();
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Abcd!1234" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "Abcd!1234" },
    });
    fireEvent.click(screen.getByText("Sign Up"));
    await waitFor(() => {
      expect(screen.getByText("Email already registered")).toBeInTheDocument();
    });
  });

  it("should have link to login", () => {
    renderRegister();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});

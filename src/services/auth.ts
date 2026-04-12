import { api } from "@/services/api";

export interface AuthUser {
  id: string;
  fullName: string;
  email: string;
  onboardingDone: boolean;
}

interface LoginResponse {
  user: AuthUser;
  token: string;
}

export async function loginUser(email: string, password: string) {
  const { data } = await api.post<LoginResponse>("/api/auth/login", {
    email,
    password,
  });
  return data;
}

export async function registerUser(
  fullName: string,
  email: string,
  password: string,
) {
  const { data } = await api.post<AuthUser>("/api/auth/register", {
    fullName,
    email,
    password,
  });
  return data;
}

export async function markOnboardingDone(userId: string) {
  const { data } = await api.post("/api/auth/onboarding-done", { userId });
  return data;
}

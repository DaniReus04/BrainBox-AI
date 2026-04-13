import type { InternalAxiosRequestConfig } from "axios";

import { api } from "@/services/api";
import { hashText } from "@/utils/hash";

const USERS_KEY = "brainbox_users";

export interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  password: string;
  onboardingDone: boolean;
}

function getUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function createMockResponse(
  data: unknown,
  config: InternalAxiosRequestConfig,
  status = 200,
) {
  return {
    data,
    status,
    statusText: status === 200 ? "OK" : "Error",
    headers: {},
    config,
  };
}

function createMockError(
  message: string,
  config: InternalAxiosRequestConfig,
  status: number,
) {
  const error = Object.assign(new Error(message), {
    response: createMockResponse({ error: message }, config, status),
    isAxiosError: true,
    config,
  });
  return error;
}

api.interceptors.request.use((config) => {
  if (!config.url?.startsWith("/api/auth")) return config;

  config.adapter = async (cfg: InternalAxiosRequestConfig) => {
    await new Promise((r) => setTimeout(r, 200));

    const body = typeof cfg.data === "string" ? JSON.parse(cfg.data) : cfg.data;

    if (cfg.url === "/api/auth/register" && cfg.method === "post") {
      const users = getUsers();
      const exists = users.some(
        (u) => u.email.toLowerCase() === body.email.toLowerCase(),
      );
      if (exists) {
        throw createMockError("Email already registered", cfg, 409);
      }
      const hashedPassword = await hashText(body.password);
      const newUser: StoredUser = {
        id: crypto.randomUUID(),
        fullName: body.fullName,
        email: body.email,
        password: hashedPassword,
        onboardingDone: false,
      };
      users.push(newUser);
      saveUsers(users);
      const { password: _, ...safe } = newUser;
      return createMockResponse(safe, cfg);
    }

    if (cfg.url === "/api/auth/login" && cfg.method === "post") {
      const users = getUsers();
      const hashedPassword = await hashText(body.password);
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === body.email.toLowerCase() &&
          u.password === hashedPassword,
      );
      if (!user) {
        throw createMockError("Invalid email or password", cfg, 401);
      }
      const { password: _, ...safe } = user;
      return createMockResponse(
        { user: safe, token: `mock-token-${user.id}` },
        cfg,
      );
    }

    if (cfg.url === "/api/auth/change-password" && cfg.method === "post") {
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === body.userId);
      if (idx === -1) {
        throw createMockError("User not found", cfg, 404);
      }
      const hashedCurrent = await hashText(body.currentPassword);
      if (users[idx].password !== hashedCurrent) {
        throw createMockError("Invalid current password", cfg, 401);
      }
      users[idx].password = await hashText(body.newPassword);
      saveUsers(users);
      return createMockResponse({ success: true }, cfg);
    }

    if (cfg.url === "/api/auth/onboarding-done" && cfg.method === "post") {
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === body.userId);
      if (idx !== -1) {
        users[idx].onboardingDone = true;
        saveUsers(users);
      }
      return createMockResponse({ success: true }, cfg);
    }

    return createMockResponse(null, cfg);
  };

  return config;
});

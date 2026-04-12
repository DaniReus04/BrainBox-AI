import type { InternalAxiosRequestConfig } from "axios";
import { api } from "@/services/api";

const STORAGE_KEY = "brainbox_onboarding";

export interface OnboardingRecord {
  status: "completed" | "skipped";
  completedAt: string;
}

function createMockResponse(data: unknown, config: InternalAxiosRequestConfig) {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  };
}

api.interceptors.request.use((config) => {
  if (config.url !== "/api/onboarding") return config;

  config.adapter = async (cfg: InternalAxiosRequestConfig) => {
    await new Promise((r) => setTimeout(r, 150));

    if (cfg.method === "post") {
      const body =
        typeof cfg.data === "string" ? JSON.parse(cfg.data) : cfg.data;
      const record: OnboardingRecord = {
        status: body.status,
        completedAt: body.completedAt,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
      return createMockResponse(record, cfg);
    }

    if (cfg.method === "get") {
      const stored = localStorage.getItem(STORAGE_KEY);
      const data: OnboardingRecord | null = stored ? JSON.parse(stored) : null;
      return createMockResponse(data, cfg);
    }

    return createMockResponse(null, cfg);
  };

  return config;
});

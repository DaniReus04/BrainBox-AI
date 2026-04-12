import type { OnboardingRecord } from "@/mocks/onboarding.mock";
import { api } from "./api";

export type OnboardingStatus = "completed" | "skipped";

export async function saveOnboardingStatus(
  status: OnboardingStatus,
): Promise<OnboardingRecord> {
  const { data } = await api.post<OnboardingRecord>("/api/onboarding", {
    status,
    completedAt: new Date().toISOString(),
  });
  return data;
}

export async function getOnboardingStatus(): Promise<OnboardingRecord | null> {
  const { data } = await api.get<OnboardingRecord | null>("/api/onboarding");
  return data;
}

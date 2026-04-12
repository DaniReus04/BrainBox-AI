import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import robotImage from "@/assets/img/robot-image-2.jpg";
import { LanguageToggle } from "@/components/ui/language-toggle";
import {
  OnboardingCard,
  type OnboardingStep,
} from "@/components/ui/onboarding-card";
import { SkipConfirmDialog } from "@/components/ui/skip-confirm-dialog";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  type OnboardingStatus,
  saveOnboardingStatus,
} from "@/services/onboarding";
import { setCookie } from "@/utils/cookies";

const ONBOARDING_COOKIE = "brainbox_onboarding_done";

interface OnboardingProps {
  onComplete: () => void;
}

function Onboarding({ onComplete }: OnboardingProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipDialog, setShowSkipDialog] = useState(false);

  const steps: OnboardingStep[] = useMemo(
    () => [
      {
        title: t("onboarding.step1Title"),
        description: t("onboarding.step1Description"),
        image: robotImage,
      },
      {
        title: t("onboarding.step2Title"),
        description: t("onboarding.step2Description"),
        image: robotImage,
      },
      {
        title: t("onboarding.step3Title"),
        description: t("onboarding.step3Description"),
        image: robotImage,
      },
    ],
    [t],
  );

  const finishOnboarding = useCallback(
    async (status: OnboardingStatus) => {
      setCookie(ONBOARDING_COOKIE, status);
      try {
        await saveOnboardingStatus(status);
      } catch {
        /* empty */
      }
      onComplete();
    },
    [onComplete],
  );

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      finishOnboarding("completed");
    }
  }, [currentStep, steps.length, finishOnboarding]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleSkipRequest = useCallback(() => {
    setShowSkipDialog(true);
  }, []);

  const handleSkipCancel = useCallback(() => {
    setShowSkipDialog(false);
  }, []);

  const handleSkipConfirm = useCallback(() => {
    setShowSkipDialog(false);
    finishOnboarding("skipped");
  }, [finishOnboarding]);

  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-background">
      <ThemeToggle />
      <LanguageToggle />

      <OnboardingCard
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrev={handlePrev}
        onSkip={handleSkipRequest}
        skipLabel={t("onboarding.skip")}
      />

      <SkipConfirmDialog
        open={showSkipDialog}
        title={t("onboarding.skipConfirmTitle")}
        description={t("onboarding.skipConfirmDescription")}
        cancelLabel={t("onboarding.skipConfirmCancel")}
        confirmLabel={t("onboarding.skipConfirmAction")}
        onCancel={handleSkipCancel}
        onConfirm={handleSkipConfirm}
      />
    </div>
  );
}

export { ONBOARDING_COOKIE, Onboarding };

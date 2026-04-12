import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import type * as React from "react";
import { useEffect, useRef, useState } from "react";

import { PageIndicator } from "@/components/ui/page-indicator";
import { cn } from "@/lib/utils";

export interface OnboardingStep {
  title: string;
  description: string;
  image: string;
}

interface OnboardingCardProps extends React.ComponentProps<"div"> {
  steps: OnboardingStep[];
  currentStep: number;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
  skipLabel: string;
}

function OnboardingCard({
  steps,
  currentStep,
  onNext,
  onPrev,
  onSkip,
  skipLabel,
  className,
  ...props
}: OnboardingCardProps) {
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const [displayedStep, setDisplayedStep] = useState(currentStep);
  const [phase, setPhase] = useState<"visible" | "fade-out" | "fade-in">(
    "visible",
  );
  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    if (prevStepRef.current === currentStep) return;
    prevStepRef.current = currentStep;

    setPhase("fade-out");

    const fadeOutTimer = setTimeout(() => {
      setDisplayedStep(currentStep);
      setPhase("fade-in");
    }, 150);

    const fadeInTimer = setTimeout(() => {
      setPhase("visible");
    }, 300);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(fadeInTimer);
    };
  }, [currentStep]);

  const step = steps[displayedStep];

  return (
    <div
      data-slot="onboarding-card"
      className={cn(
        "relative flex w-full flex-col items-center px-6 pb-8 pt-16 md:px-12 md:pt-20 lg:px-20",
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onSkip}
        className="fixed right-5 top-5 z-30 cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:right-8 md:top-8 md:text-base"
        aria-label={skipLabel}
      >
        {skipLabel}
      </button>

      <div className="relative mt-4 mb-6 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute top-[15%] left-1/2 h-[80%] w-[90%] -translate-x-1/2 rounded-full bg-black/40 blur-2xl dark:bg-white/30"
        />

        <img
          src={step.image}
          alt="BrainBox AI"
          className="
      relative z-10
      aspect-square
      w-48 sm:w-56 md:w-64 lg:w-72
      rounded-2xl
      object-cover
    "
        />
      </div>

      <div
        className={cn(
          "flex flex-col items-center transition-all duration-150 ease-out",
          phase === "fade-out" && "translate-y-1 opacity-0",
          phase === "fade-in" && "translate-y-0 opacity-100",
          phase === "visible" && "translate-y-0 opacity-100",
        )}
      >
        <PageIndicator
          total={steps.length}
          current={currentStep}
          className="mb-6"
        />

        <h2 className="mb-2 text-center text-xl font-bold leading-tight text-foreground sm:text-2xl md:text-3xl">
          {step.title}
        </h2>

        <p className="mb-8 max-w-md text-center text-xs leading-relaxed text-muted-foreground whitespace-pre-line sm:text-sm md:text-base">
          {step.description}
        </p>
      </div>

      <div className="flex items-center gap-0">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Previous step"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-l-xl border border-border transition-colors",
            isFirst
              ? "cursor-not-allowed text-muted-foreground/40"
              : "cursor-pointer text-foreground hover:bg-muted active:bg-muted/80",
          )}
        >
          <ArrowLeft size={18} weight="bold" />
        </button>

        <div className="h-11 w-px bg-border" />

        <button
          type="button"
          onClick={onNext}
          aria-label={isLast ? "Finish onboarding" : "Next step"}
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-r-xl border border-border text-foreground transition-colors hover:bg-muted active:bg-muted/80"
        >
          <ArrowRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}

export type { OnboardingCardProps };
export { OnboardingCard };

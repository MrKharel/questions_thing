"use client";

import { cn } from "cn";

import { useOnboardingState } from "./onboarding-store";
import { StepDots, steps } from "./_components";

function OnboardingPage() {
  const step = useOnboardingState((s) => s.step);

  return (
    <div className="relative min-h-svh bg-card">
      <div className={cn("mx-auto max-w-lg px-4 pt-40 pb-16")}>{steps[step]}</div>
      <StepDots />
    </div>
  );
}

export { OnboardingPage };

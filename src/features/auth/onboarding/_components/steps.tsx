"use client";

import type { ReactNode } from "react";
import { ProfileStep } from "./profile-step";
import { TOTAL_STEPS, useOnboardingState } from "../onboarding-store";

function StepNav() {
  const step = useOnboardingState((s) => s.step);
  const next = useOnboardingState((s) => s.next);
  const back = useOnboardingState((s) => s.back);

  return (
    <div className="mt-6 flex justify-between">
      <button type="button" onClick={back} disabled={step === 0}>
        Back
      </button>
      <button type="button" onClick={next}>
        {step === TOTAL_STEPS - 1 ? "Finish" : "Continue"}
      </button>
    </div>
  );
}

export function AvatarStep() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Pick an avatar</h1>
      {/* avatar grid -> updateFormdata({ avatar }) */}
      <StepNav />
    </div>
  );
}

export function GoalStep() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">What's your main goal?</h1>
      {/* options -> updateFormdata({ mainGoal }) */}
      <StepNav />
    </div>
  );
}

export const steps: Record<number, ReactNode> = {
  0: <ProfileStep />,
  1: <AvatarStep />,
  2: <GoalStep />,
};

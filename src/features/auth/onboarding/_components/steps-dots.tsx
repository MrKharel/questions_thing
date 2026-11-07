"use client";

import { cn } from "cn";
import { TOTAL_STEPS, useOnboardingState } from "../onboarding-store";

export function StepDots() {
  const step = useOnboardingState((s) => s.step);

  return (
    <div
      className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={TOTAL_STEPS}
      aria-valuenow={step + 1}
    >
      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-2 rounded-full transition-all duration-300",
            i === step ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30",
            i < step && "bg-primary/60",
          )}
        />
      ))}
    </div>
  );
}

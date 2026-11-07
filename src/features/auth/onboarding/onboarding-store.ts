import { create } from "zustand";

import type { Profile } from "./_actions/schema-profile";

export const STEP_LABELS = ["Profile", "Avatar", "Main goal"] as const;
export const TOTAL_STEPS = STEP_LABELS.length;

export type OnboardingFormData = Required<Pick<Profile, "first_name" | "last_name" | "name" | "avatar_url">>;

type OnboardingState = {
  step: number;
  formdata: OnboardingFormData;

  setStep: (step: number) => void;
  next: () => void;
  back: () => void;
  updateFormdata: (patch: Partial<OnboardingFormData>) => void;
  reset: () => void;
};

const initialFormData: OnboardingFormData = {
  first_name: "",
  last_name: "",
  name: "",
  avatar_url: null,
};

export const useOnboardingState = create<OnboardingState>((set) => ({
  step: 0,
  formdata: initialFormData,

  setStep: (step) => set({ step: Math.min(Math.max(step, 0), TOTAL_STEPS - 1) }),
  next: () => set((s) => ({ step: Math.min(s.step + 1, TOTAL_STEPS - 1) })),
  back: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),
  updateFormdata: (patch) => set((s) => ({ formdata: { ...s.formdata, ...patch } })),
  reset: () => set({ step: 0, formdata: initialFormData }),
}));

"use client";

import { Loader2Icon } from "lucide-react";
import { CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldDescription, FieldSet } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useOnboardingState } from "../onboarding-store";

function ProfileStep() {
  const nextStep = useOnboardingState((s) => s.next);
  const formdata = useOnboardingState((s) => s.formdata);
  const updateFormdata = useOnboardingState((s) => s.updateFormdata);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      nextStep();
    } catch (error) {
      toast.add({ description: typeof error === "string" ? error : "Failed Successfully", type: "error" });
    }
  }

  return (
    <div className="!max-w-md flex flex-col gap-8">
      <CardHeader>
        <CardTitle className="text-2xl">What shall we call you?</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <Button className="relative w-fit" type="submit">
              Next
            </Button>
          </FieldSet>
        </form>
      </CardContent>
    </div>
  );
}

export { ProfileStep };

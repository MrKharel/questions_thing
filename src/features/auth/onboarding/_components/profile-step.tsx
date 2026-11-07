"use client";

import { useState } from "react";

import { Loader2Icon } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel, FieldDescription, FieldSet, FieldContent } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useOnboardingState } from "../onboarding-store";

function ProfileStep() {
  const nextStep = useOnboardingState((s) => s.next);
  const formdata = useOnboardingState((s) => s.formdata);
  const updateFormdata = useOnboardingState((s) => s.updateFormdata);

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);

    try {
      nextStep();
    } catch (error) {
      toast.add({ description: typeof error === "string" ? error : "Failed Successfully", type: "error" });
    } finally {
      setIsLoading(false);
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
            <Field orientation="horizontal">
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input
                  placeholder="Elon"
                  value={formdata.first_name ?? ""}
                  onChange={(e) => updateFormdata({ first_name: e.target.value })}
                  autoFocus
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input
                  placeholder="Musk"
                  value={formdata.last_name ?? ""}
                  onChange={(e) => updateFormdata({ last_name: e.target.value })}
                  required
                />
              </Field>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Name</FieldLabel>
              <Input
                id="name"
                type="name"
                placeholder="@elonmusk"
                value={formdata.name}
                onChange={(e) => updateFormdata({ name: e.target.value })}
                required
              />
              <FieldDescription>Choose a unique name for your account</FieldDescription>
            </Field>

            <Button className="relative w-fit" disabled={isLoading} type="submit">
              {isLoading && <Loader2Icon className="animate-spin size-4 absolute top-1/2 -translate-y-1/2 right-2" />}
              Next
            </Button>
          </FieldSet>
        </form>
      </CardContent>
    </div>
  );
}

export { ProfileStep };

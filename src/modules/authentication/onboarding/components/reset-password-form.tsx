"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import Link from "next/link";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldDescription, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { resetPassword } from "../../_actions/forgot-password";

const GENERIC_ERROR = "Something went wrong. Please try again.";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    let successful = false;

    try {
      successful = await resetPassword(password);
    } catch (err) {
      setError(err instanceof Error ? err.message : GENERIC_ERROR);
    } finally {
      setIsLoading(false);
    }

    if (successful) redirect("/onboarding/login");
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Password</CardTitle>
        <CardDescription>
          Have you checked your email? If you have clicked your magic link, then go on and change your password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} noValidate={false} aria-busy={isLoading}>
          <FieldGroup className="gap-3">
            <FieldSet disabled={isLoading}>
              <Field data-invalid={error ? true : undefined}>
                <FieldDescription>Password must be atleast 8 characters long</FieldDescription>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="verystrongpassword"
                  autoComplete="new-password"
                  autoFocus
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError(null);
                  }}
                />
              </Field>

              {error && (
                <FieldError id="email-error" role="alert" className="text-center">
                  {error}
                </FieldError>
              )}
            </FieldSet>

            <Button type="submit" className="relative" disabled={isLoading}>
              {isLoading ? "Changing Password..." : "Change my password"}
              {isLoading && (
                <Loader2Icon aria-hidden="true" className="animate-spin size-4 absolute top-1/2 -translate-y-1/2 right-2" />
              )}
            </Button>

            <Button variant="outline" nativeButton={false} render={<Link href="/onboarding/login" className="no-underline" />}>
              <ArrowLeftIcon className="size-4" />
              Back to Login
            </Button>

            <CardDescription>Make sure that you absolutely didn't change the url at all.</CardDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export { ResetPasswordForm };

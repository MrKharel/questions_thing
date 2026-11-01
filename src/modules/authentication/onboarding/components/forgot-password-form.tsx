"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2Icon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { sendResetPasswordEmail } from "../../_actions/forgot-password";

const GENERIC_ERROR = "Something went wrong. Please try again.";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const sent = await sendResetPasswordEmail(email);
      if (sent) setIsSent(true);
      else setError(GENERIC_ERROR);
    } catch (err) {
      setError(err instanceof Error ? err.message : GENERIC_ERROR);
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setIsSent(false);
    setError(null);
  }

  if (isSent) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <CheckCircle2Icon className="size-10 text-green-600" aria-hidden="true" />
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            If an account exists for <span className="font-medium break-all">{email}</span>, we&apos;ve sent a link to reset your
            password.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3" role="status" aria-live="polite">
          <Button type="button" variant="outline" onClick={handleReset}>
            Use a different email
          </Button>
          <Link href="/onboarding/login" className="text-center text-sm underline-offset-4 hover:underline">
            Back to login
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Forgot Password</CardTitle>
        <CardDescription>Enter your email and we&apos;ll send you a link to reset your password.</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} noValidate={false} aria-busy={isLoading}>
          <FieldGroup>
            <FieldSet disabled={isLoading}>
              <Field data-invalid={error ? true : undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  value={email}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "email-error" : undefined}
                  onChange={(e) => {
                    setEmail(e.target.value);
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
              {isLoading ? "Sending..." : "Send reset link"}
              {isLoading && (
                <Loader2Icon aria-hidden="true" className="animate-spin size-4 absolute top-1/2 -translate-y-1/2 right-2" />
              )}
            </Button>

            <div className="flex flex-col items-center gap-1 text-sm">
              <Link href="/onboarding/login" className="underline-offset-4 hover:underline">
                Back to login
              </Link>
              <span className="text-muted-foreground">
                Don&apos;t have an account yet?{" "}
                <Link href="/onboarding/register" className="text-foreground underline-offset-4 hover:underline">
                  Register
                </Link>
              </span>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export { ForgotPasswordForm };

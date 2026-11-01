"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet, FieldContent, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginWithPassword } from "../../_actions/onboarding";
import { Loader2Icon } from "lucide-react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({ isLoading: false, error: null as null | string });

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ isLoading: true, error: null });
    let successful = false;

    try {
      successful = await loginWithPassword(email, password);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "An unexpected error occurred.",
        isSuccessful: false,
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }

    if (successful) redirect("/");
  }

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login to QuestionsThing</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <FieldContent className="flex-row justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <FieldLabel>
                    <Link href="/onboarding/forgot-password">Forgot Password</Link>
                  </FieldLabel>
                </FieldContent>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  autoComplete="new-password"
                  minLength={8}
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {state.error && <FieldError className="text-center">{state.error}</FieldError>}
            </FieldSet>

            <Button type="submit" className="relative" disabled={state.isLoading}>
              Login {state.isLoading && <Loader2Icon className="animate-spin size-4 absolute top-1/2 -translate-y-1/2 right-2" />}
            </Button>

            <FieldLabel className="self-center">
              Don't have an account yet?!
              <Link href="/onboarding/register">Register</Link>
            </FieldLabel>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

export { LoginForm };

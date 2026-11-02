"use client";

import { useState } from "react";

import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldDescription, FieldLabel, FieldSet, FieldError } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { signup } from "../../_actions/onboarding";
import { Loader2Icon } from "lucide-react";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({ isLoading: false, error: null as null | string, isSuccessful: null as null | boolean });
  const [openDialog, setOpenDialog] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ isLoading: true, error: null, isSuccessful: null });
    try {
      await signup(email, password, { username: name });
      setState((prev) => ({ ...prev, isSuccessful: true }));
      setOpenDialog(true);
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "An unexpected error occurred.",
        isSuccessful: false,
      }));
      setOpenDialog(false);
    } finally {
      setState((prev) => ({ ...prev, isLoading: true }));
    }
  }

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup to QuestionsThing</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
                <FieldDescription>Choose a unique username for your account</FieldDescription>
              </Field>

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
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <FieldDescription>Password must be atleast 8 characters long</FieldDescription>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  autoComplete="new-password"
                  minLength={8}
                  required={false}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {state.error && <FieldError className="text-center">{state.error}</FieldError>}
            </FieldSet>

            <Button type="submit" className="relative" disabled={state.isLoading || (state.isSuccessful ? true : false)}>
              Register
              {state.isLoading && <Loader2Icon className="animate-spin size-4 absolute top-1/2 -translate-y-1/2 right-2" />}
            </Button>

            <FieldLabel className="mx-auto">
              Already have an account?! <Link href="login">Login</Link>
            </FieldLabel>
          </FieldGroup>
        </form>
      </CardContent>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mb-2 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Mail className="size-7" />
            </div>

            <DialogTitle className="text-xl">Check your email</DialogTitle>

            <DialogDescription className="text-center">
              We've sent a magic link to <span className="font-medium text-foreground">{email}</span>. Click the link in your
              email to verify your email address and sign in.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button className="w-full" onClick={() => window.open("https://mail.google.com", "_blank", "noopener,noreferrer")}>
              Open Gmail
              <ExternalLink className="ml-2 size-4" />
            </Button>

            <DialogClose render={<Button variant="ghost" className="w-full" />}>I'll do this later</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export { RegisterForm };

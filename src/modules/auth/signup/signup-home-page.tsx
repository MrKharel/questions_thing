"use client";
import { useState } from "react";
import Link from "next/link";
import { KeyIcon, Loader2Icon, MailIcon, UserIcon } from "lucide-react";

import {
  FormContent,
  FormHeader,
  FormInput,
  FormTitle,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signupWithEmail } from "../auth-actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function SignupHomePage() {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    retypePassword: "",
  });
  const [state, setState] = useState({
    isLoading: false,
    error: null as null | string,
    isSuccessful: null as null | boolean,
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ isLoading: true, error: null, isSuccessful: false });

    try {
      const { error } = await signupWithEmail(formdata);
      if (error) {
        throw new Error(error.message);
      }
      setState((prev) => ({ ...prev, isSuccessful: true }));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message, isSuccessful: false }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <>
      <FormHeader className="self-center">
        <FormTitle className="tracking-wide">
          Signup to QuestionsThing
        </FormTitle>
      </FormHeader>

      {state.error && (
        <p className="text-sm text-rose-400 self-center">{state.error}</p>
      )}

      <FormContent onSubmit={handleSubmit} className="gap-2">
        <FormInput
          icon={MailIcon}
          placeholder="you@gmail.com"
          type="email"
          autoComplete="email"
          label={<>Email</>}
          value={formdata.email}
          onChange={(e) =>
            setFormdata((prev) => ({ ...prev, email: e.target.value }))
          }
          required
          autoFocus
        />
        <FormInput
          icon={KeyIcon}
          placeholder="very_strong_password"
          type="password"
          autoComplete="new-password"
          label={<>Password</>}
          value={formdata.password}
          onChange={(e) =>
            setFormdata((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <FormInput
          icon={KeyIcon}
          placeholder="very_strong_password"
          type="password"
          autoComplete="new-password"
          label={<>Retype Password</>}
          value={formdata.retypePassword}
          onChange={(e) =>
            setFormdata((prev) => ({ ...prev, retypePassword: e.target.value }))
          }
          required
        />

        <Button disabled={state.isLoading} type="submit" className={"relative"}>
          Signup with Email
          {state.isLoading && (
            <Loader2Icon className="absolute top-1/2 -translate-y-1/2 right-2 animate-spin" />
          )}
        </Button>
      </FormContent>

      <AlertDialog
        open={state.isSuccessful ?? false}
        onOpenChange={(value) =>
          setState((prev) => ({ ...prev, isSuccessful: value }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Check your email</AlertDialogTitle>
            <AlertDialogDescription>
              We've sent a magick link to <strong>{formdata.email}</strong>.
              Please confirm that it's really you who are trying to log in with
              this email.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button render={<AlertDialogCancel />} variant="outline">
              Cancel
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="https://mail.google.com/mail/" />}
            >
              Check your Email
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

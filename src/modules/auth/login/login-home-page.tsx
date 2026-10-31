"use client";
import Link from "next/link";
import { useState } from "react";
import { KeyIcon, MailIcon, Loader2Icon } from "lucide-react";
import {
  FormContent,
  FormInput,
  FormHeader,
  FormTitle,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signinWithPassword } from "../auth-actions";

const LoginHomePage = () => {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [state, setState] = useState({
    isLoading: false,
    error: null as null | string,
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ isLoading: true, error: null });

    try {
      const { error } = await signinWithPassword(formdata);
      if (error) {
        throw new Error(error.message);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return (
    <>
      <FormHeader className="self-center">
        <FormTitle className="tracking-wide">Login to QuestionsThing</FormTitle>
      </FormHeader>

      {state.error && (
        <p className="text-rose-400 text-sm self-center">{state.error}</p>
      )}

      <FormContent onSubmit={handleSubmit} className="gap-2">
        <FormInput
          icon={MailIcon}
          placeholder="you@gmail.com"
          type="email"
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
          placeholder="very-strong-password-1"
          type="password"
          autoComplete="current-password"
          label={
            <>
              Password
              <Link
                href="/help/forgot-password"
                className="underline underline-offset-3"
              >
                Forgot Password
              </Link>
            </>
          }
          value={formdata.password}
          onChange={(e) =>
            setFormdata((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <Button disabled={state.isLoading} type="submit" className={"relative"}>
          Continue with email
          {state.isLoading && (
            <Loader2Icon className="absolute top-1/2 -translate-y-1/2 right-2 animate-spin" />
          )}
        </Button>
      </FormContent>
    </>
  );
};

export { LoginHomePage };

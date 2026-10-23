"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { updateUserPassword } from "@/features/auth/auth-actions";

import { Button } from "@/components/ui/button";
import {
  FormContent,
  FormTitle,
  FormHeader,
  FormInput,
  FormDescription,
} from "@/components/ui/form";
import { KeyIcon, Loader2Icon, UserRoundCheckIcon } from "lucide-react";

import type { SubmitEvent } from "react";

export function ResetPasswordPage() {
  const router = useRouter();

  const [formdata, setFormdata] = useState({
    password: "",
    retypePasssword: "",
  });
  const [state, setState] = useState({
    isLoading: false,
    error: null as null | string,
  });

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formdata.password !== formdata.retypePasssword) {
      setState({
        isLoading: state.isLoading,
        error: "Passwords aren't matching.",
      });
      return;
    }

    try {
      const { error } = await updateUserPassword(formdata.password);
      if (error) {
        throw new Error(error.message);
      }
      router.push("/login");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      setState((prev) => ({ ...prev, error: message }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <>
      <FormHeader className="self-center">
        <FormTitle>Change your password</FormTitle>
        <FormDescription>
          Forgot your password? No worries. Get back where you left off.
        </FormDescription>
      </FormHeader>

      {state.error && <p className="text-sm text-rose-400">{state.error}</p>}

      <FormContent onSubmit={handleSubmit}>
        <FormInput
          type="password"
          autoComplete={"new-password"}
          icon={KeyIcon}
          placeholder={"Enter your password"}
          value={formdata.password}
          onChange={(e) =>
            setFormdata((prev) => ({ ...prev, password: e.target.value }))
          }
          autoFocus
          required
        />
        <FormInput
          type="password"
          autoComplete={"new-password"}
          icon={UserRoundCheckIcon}
          placeholder={"Retype your password"}
          value={formdata.retypePasssword}
          onChange={(e) =>
            setFormdata((prev) => ({
              ...prev,
              retypePasssword: e.target.value,
            }))
          }
          required
        />
        <Button type="submit" className={"relative"}>
          {state.isLoading && (
            <Loader2Icon className="size-4 animate-spin absolute top-1/2 -translate-y-1/2 right-2" />
          )}
          Continue
        </Button>
      </FormContent>
    </>
  );
}

"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { cn } from "cn";

import { Loader2Icon, ArrowLeftIcon, KeyIcon } from "lucide-react";
import {
  FormContent,
  FormInput,
  FormButton,
} from "@/features/auth/components/auth-form";
import { Button } from "@/components/ui/button";

import { useFormdataStore } from "../use-formdata-store";

const LoginPasswordScreen = () => {
  const { email, password, setPassword } = useFormdataStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  return (
    <FormContent
      onSubmit={handleSubmit}
      className="max-w-xs w-full self-center"
    >
      <FormInput
        type="password"
        placeholder="you@email.com"
        icon={KeyIcon}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
      />

      <FormButton className="relative" disabled={isLoading}>
        Login
        {isLoading && (
          <Loader2Icon className="absolute top-1/2 -translate-y-1/2 right-2 animate-spin" />
        )}
      </FormButton>
      <Button
        variant="outline"
        nativeButton={false}
        render={<Link href="/login" />}
      >
        <ArrowLeftIcon size={16} />
        Back
      </Button>
    </FormContent>
  );
};

export { LoginPasswordScreen };

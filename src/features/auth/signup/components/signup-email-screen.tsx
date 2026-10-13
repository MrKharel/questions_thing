"use client";

import Link from "next/link";
import { useState } from "react";

import { Loader2Icon, ArrowLeftIcon, KeyIcon, MailIcon } from "lucide-react";
import {
  FormContent,
  FormInput,
  FormButton,
  FormError,
} from "@/features/auth/components/auth-form";
import { Button } from "@/components/ui/button";

import { useFormdataStore } from "../use-formdata-store";
import { signUp } from "../../auth-actions";

const SignupEmailScreen = () => {
  const { email, password, setEmail, setPassword } = useFormdataStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signUp(email, password);
    if (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return (
    <FormContent
      onSubmit={handleSubmit}
      className="max-w-xs w-full self-center"
    >
      {error && <FormError>{error}</FormError>}

      <FormInput
        type="email"
        placeholder="you@email.com"
        icon={MailIcon}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        required
      />
      <FormInput
        type="password"
        placeholder="very_string_password123"
        icon={KeyIcon}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <FormButton className="relative" disabled={isLoading}>
        Continue
        {isLoading && (
          <Loader2Icon className="absolute top-1/2 -translate-y-1/2 right-2 animate-spin" />
        )}
      </FormButton>
      <Button
        variant="outline"
        nativeButton={false}
        render={<Link href="/signup" />}
      >
        <ArrowLeftIcon size={16} />
        Back
      </Button>
    </FormContent>
  );
};

export { SignupEmailScreen };

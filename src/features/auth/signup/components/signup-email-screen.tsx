"use client";

import Link from "next/link";
import { useState } from "react";

import { Loader2Icon, ArrowLeftIcon, KeyIcon } from "lucide-react";
import {
  FormContent,
  FormInput,
  FormButton,
} from "@/features/auth/components/auth-form";
import { Button } from "@/components/ui/button";

const SignupEmailScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <FormContent className="max-w-xs w-full self-center">
      <FormInput
        type="password"
        placeholder="you@email.com"
        icon={KeyIcon}
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
        render={<Link href="/signup" />}
      >
        <ArrowLeftIcon size={16} />
        Back
      </Button>
    </FormContent>
  );
};

export { SignupEmailScreen };

"use client";

import Link from "next/link";
import { useState } from "react";

import { Loader2Icon, ArrowLeftIcon, KeyIcon } from "lucide-react";
import { FormContent, FormInput, FormError } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useFormdataStore } from "../use-formdata-store";
import { signInWithPassword } from "../../auth-actions";

const LoginPasswordScreen = () => {
  const { email, password, setPassword } = useFormdataStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signInWithPassword(email, password);
      if (error) {
        setError("Invalid Credientials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContent onSubmit={handleSubmit} className="max-w-xs w-full self-center">
      {error && <FormError>{error}</FormError>}

      <FormInput
        type="password"
        placeholder="supa-strong-password-123"
        icon={KeyIcon}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
      />

      <Button type="submit" className="relative" disabled={isLoading} variant={"secondary"}>
        Login
        {isLoading && <Loader2Icon className="absolute top-1/2 -translate-y-1/2 right-2 animate-spin" />}
      </Button>
      <Button variant="outline" nativeButton={false} render={<Link href="/login" />}>
        <ArrowLeftIcon size={16} />
        Back
      </Button>
    </FormContent>
  );
};

export { LoginPasswordScreen };

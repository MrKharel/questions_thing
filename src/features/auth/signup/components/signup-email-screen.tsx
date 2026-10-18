"use client";

import Link from "next/link";
import { useState } from "react";

import { Loader2Icon, ArrowLeftIcon, KeyIcon, MailIcon } from "lucide-react";
import { FormContent, FormInput, FormError } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useFormdataStore } from "../use-formdata-store";
import { signUp } from "../../auth-actions";

const SignupEmailScreen = () => {
  const { email, password, setEmail, setPassword } = useFormdataStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccessful, setIsSuccessful] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setIsSuccessful(null);

    const { error } = await signUp(email, password);
    if (error) {
      setError(error.message);
      setIsSuccessful(false);
    }
    setIsSuccessful(true);
    setIsLoading(false);
  };

  return (
    <FormContent onSubmit={handleSubmit} className="max-w-xs w-full self-center">
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

      <Button
        className="relative"
        disabled={isLoading || isSuccessful ? true : false}
        variant="secondary"
        type="submit"
      >
        Continue
        {isLoading && <Loader2Icon className="absolute top-1/2 -translate-y-1/2 right-2 animate-spin" />}
      </Button>
      <Button variant="outline" nativeButton={false} render={<Link href="/signup" />}>
        <ArrowLeftIcon size={16} />
        Back
      </Button>

      <Dialog open={isSuccessful ? true : false} onOpenChange={setIsSuccessful}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Check your email</DialogTitle>
            <DialogDescription>
              We need to verify that it&apos;s really you. We&apos;ve sent a verification link to{" "}
              <span className="font-medium text-foreground">{email}</span>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <Button
              nativeButton={false}
              render={<a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" />}
            >
              Open Gmail
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </FormContent>
  );
};

export { SignupEmailScreen };

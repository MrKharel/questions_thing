"use client";

import { MailIcon } from "lucide-react";
import {
  FormContent,
  FormInput,
  FormButton,
} from "@/features/auth/components/auth-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { useFormdataStore } from "../use-formdata-store";
import { redirect } from "next/navigation";

const LoginHomeScreen = () => {
  const { email, setEmail } = useFormdataStore();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirect("/login?screen=enter_password");
  };

  return (
    <FormContent
      onSubmit={handleSubmit}

      className="max-w-xs w-full self-center"
    >
      <FormInput
        type="email"
        placeholder="you@email.com"
        icon={MailIcon}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        required
      />

      <FormButton variant={"secondary"} type="submit">
        Continue with Email
      </FormButton>

      <Separator className="h-[1px]" />

      <Button variant="outline" className="font-normal">
        Continue with Google
      </Button>
      <Button variant="outline" className="font-normal">
        Continue with Apple
      </Button>
      <Button variant="outline" className="font-normal">
        Continue with Github
      </Button>
    </FormContent>
  );
};

export { LoginHomeScreen };

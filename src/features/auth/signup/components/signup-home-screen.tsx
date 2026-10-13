"use client";

import Link from "next/link";

import { FormContent, FormButton } from "@/features/auth/components/auth-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SignupHomeScreen = () => {
  return (
    <FormContent>
      <Button variant="outline" className="font-normal">
        Continue with Google
      </Button>
      <Button variant="outline" className="font-normal">
        Continue with Apple
      </Button>
      <Button variant="outline" className="font-normal">
        Continue with Github
      </Button>

      <Separator className={"h-[1px]"} />

      <FormButton
        nativeButton={false}
        render={<Link href="/signup?screen=signup_with_email" />}
      >
        Continue with Email
      </FormButton>
    </FormContent>
  );
};

export { SignupHomeScreen };

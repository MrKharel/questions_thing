"use client";

import Link from "next/link";

import { FormContent } from "@/components/ui/form";
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

      <Button
        variant="secondary"
        type="submit"
        nativeButton={false}
        render={<Link href="/signup?screen=signup_with_email" />}
      >
        Continue with Email
      </Button>
    </FormContent>
  );
};

export { SignupHomeScreen };

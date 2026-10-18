"use client";

import { useState } from "react";

import { Form, FormContent, FormTitle, FormButton } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const JoinClass = () => {
  const [code, setCode] = useState<string>("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Form className="my-16 flex md:w-sm flex-col items-center gap-6 px-4 md:px-0 py-10">
      <FormTitle>Join a class</FormTitle>

      <p className="text-center text-sm text-foreground/60">
        Enter the class code provided by your teacher to join your class and get started.
      </p>

      <FormContent onSubmit={handleSubmit} className="gap-6 justify-center items-center">
        <InputOTP maxLength={6} value={code} onChange={(e) => setCode(e)}>
          <InputOTPGroup className="gap-2 self-center">
            <InputOTPSlot index={0} className="size-10 !rounded-lg uppercase" />
            <InputOTPSlot
              index={1}
              className="size-10 rounded-lg border text-lg font-medium uppercase first:rounded-lg first:border"
            />
            <InputOTPSlot
              index={2}
              className="size-10 rounded-lg border text-lg font-medium uppercase first:rounded-lg first:border"
            />
            <InputOTPSlot
              index={3}
              className="size-10 rounded-lg border text-lg font-medium uppercase first:rounded-lg first:border"
            />
            <InputOTPSlot
              index={4}
              className="size-10 rounded-lg border text-lg font-medium uppercase first:rounded-lg first:border"
            />
            <InputOTPSlot
              index={5}
              className="size-10 rounded-lg border text-lg font-medium uppercase first:rounded-lg first:border"
            />
          </InputOTPGroup>
        </InputOTP>

        <FormButton className="w-full self-center">Create new class</FormButton>
      </FormContent>
    </Form>
  );
};

export { JoinClass };

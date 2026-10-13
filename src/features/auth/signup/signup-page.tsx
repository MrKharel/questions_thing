"use client";

import { useSearchParams } from "next/navigation";

import { FormWrapper, FormHeader } from "../components/auth-form";
import { SignupHomeScreen } from "./components/signup-home-screen";
import { SignupEmailScreen } from "./components/signup-email-screen";

const SignupForm = () => {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <FormWrapper>
      <FormHeader>
        Signin for your <br /> own virtual classroom
      </FormHeader>

      {screen === "signup_with_email" && <SignupEmailScreen />}

      {screen !== "signup_with_email" && <SignupHomeScreen />}
    </FormWrapper>
  );
};

export { SignupForm };

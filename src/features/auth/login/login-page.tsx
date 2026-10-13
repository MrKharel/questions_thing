"use client";

import { useSearchParams } from "next/navigation";

import { FormWrapper, FormHeader } from "../components/auth-form";
import { LoginHomeScreen } from "./components/login-home-screen";
import { LoginPasswordScreen } from "./components/login-password-screen";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const screen = searchParams.get("screen");

  return (
    <FormWrapper>
      <FormHeader>Login to QuestionThings</FormHeader>

      {!screen && <LoginHomeScreen />}

      {screen === "enter_password" && <LoginPasswordScreen />}
    </FormWrapper>
  );
};

export { LoginForm };

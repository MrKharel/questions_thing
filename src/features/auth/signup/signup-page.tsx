import { FormWrapper, FormHeader } from "../components/auth-form";
import { SignupHomeScreen } from "./components/signup-home-screen";
import { SignupEmailScreen } from "./components/signup-email-screen";

const SignupForm = async ({
  searchParams,
}: {
  searchParams: Promise<{ screen?: string }>;
}) => {
  const screen = (await searchParams).screen;

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

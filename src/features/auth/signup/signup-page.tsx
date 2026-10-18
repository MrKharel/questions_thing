import { Form, FormHeader } from "@/components/ui/form";
import { SignupHomeScreen } from "./components/signup-home-screen";
import { SignupEmailScreen } from "./components/signup-email-screen";

const SignupForm = async ({ searchParams }: { searchParams: Promise<{ screen?: string | undefined }> }) => {
  const screen = (await searchParams).screen;

  return (
    <Form>
      <FormHeader>
        Signin for your <br /> own virtual classroom
      </FormHeader>
      {screen === "signup_with_email" && <SignupEmailScreen />}

      {screen !== "signup_with_email" && <SignupHomeScreen />}
    </Form>
  );
};

export { SignupForm };

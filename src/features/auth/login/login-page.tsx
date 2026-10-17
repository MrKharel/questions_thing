import { FormWrapper, FormHeader } from "../components/auth-form";
import { LoginHomeScreen } from "./components/login-home-screen";
import { LoginPasswordScreen } from "./components/login-password-screen";

const LoginForm = async ({
  searchParams,
}: {
  searchParams: Promise<{ screen?: string | undefined }>;
}) => {
  const screen = (await searchParams).screen;

  return (
    <FormWrapper>
      <FormHeader>Login to QuestionThings</FormHeader>
      {!screen && <LoginHomeScreen />}
      {screen === "enter_password" && <LoginPasswordScreen />}
    </FormWrapper>
  );
};

export { LoginForm };

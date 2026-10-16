import LoginForm from "@/features/auth/login";

const LoginPage = ({
  searchParams,
}: {
  searchParams: Promise<{ screen?: string }>;
}) => {
  return <LoginForm searchParams={searchParams} />;
};

export default LoginPage;

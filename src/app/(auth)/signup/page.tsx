import SignupForm from "@/features/auth/signup";

const SignupPage = ({
  searchParams,
}: {
  searchParams: Promise<{ screen?: string | undefined }>;
}) => {
  return <SignupForm searchParams={searchParams} />;
};

export default SignupPage;

import Home from "@/features/home";

const LandingPage = ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) => {
  return <Home searchParams={searchParams} />;
};

export default LandingPage;

import OverviewPage from "@/features/classes/overview";

const ClassOverviewPage = async ({
  params,
}: {
  params: Promise<{ classId: string }>;
}) => {
  const { classId } = await params;
  console.log(classId);

  return <OverviewPage />;
};

export default ClassOverviewPage;

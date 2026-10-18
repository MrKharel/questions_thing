import { Navbar } from "@/components/navbar";

import type { ReactNode } from "react";

type ClassOverviewLayoutProps = {
  children: ReactNode;
  params: Promise<{ class_id: string }>;
};

const ClassOverviewLayout = async ({ children, params }: ClassOverviewLayoutProps) => {
  const { class_id } = await params;

  return (
    <>
      <Navbar navItems={[{ label: "Overview", url: `/class/${class_id}` }]} />
      {children}
    </>
  );
};

export default ClassOverviewLayout;

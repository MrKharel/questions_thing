import ClassLayoutComponent from "@/features/classes/class-layout";

import type { ReactNode } from "react";

const ClassLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ classId: string }>;
}) => {
  const { classId } = await params;

  return <ClassLayoutComponent id={classId}>{children}</ClassLayoutComponent>;
};

export default ClassLayout;

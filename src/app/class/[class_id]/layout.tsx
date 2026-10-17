import ClassLayoutComponent from "@/features/class";

import type { ReactNode } from "react";

const ClassLayout = async ({ children }: { children: ReactNode }) => {
  return <ClassLayoutComponent>{children}</ClassLayoutComponent>;
};

export default ClassLayout;

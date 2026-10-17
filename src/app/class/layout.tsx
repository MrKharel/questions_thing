import type { ReactNode } from "react";

import { Header } from "@/components/header";

const ClassLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ClassLayout;

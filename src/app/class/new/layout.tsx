import { Navbar } from "@/components/navbar";

import type { ReactNode } from "react";

const NewClassPagesLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar
        navItems={[
          { label: "Create class", url: "/class/new/create" },
          { label: "Join class", url: "/class/new/join" },
        ]}
      />
      {children}
    </>
  );
};

export default NewClassPagesLayout;

import { Suspense } from "react";
import { AuthLayout as LayoutComponent } from "@/modules/auth/auth-layout";

import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login... and study hard GUYZ",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<></>}>
      <LayoutComponent>{children}</LayoutComponent>
    </Suspense>
  );
};
export default AuthLayout;

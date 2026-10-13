import type { ReactNode } from "react";

import { AuthLayoutComponent } from "@/features/auth/auth-layout";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <AuthLayoutComponent>{children}</AuthLayoutComponent>;
};

export default AuthLayout;

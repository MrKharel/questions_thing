import "./globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";

type RootLayoutProps = {
  children: ReactNode;
};

const metadata: Metadata = {
  title: "IDK",
  description: "i have no idea.",
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
export { metadata };

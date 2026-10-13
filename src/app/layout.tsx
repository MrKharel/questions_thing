import "./globals.css";

import { ThemeProvider } from "@/lib/theme-provider";

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
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
export { metadata };

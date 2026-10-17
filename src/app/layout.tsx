import "./globals.css";

import { ThemeProvider } from "@/lib/theme-provider";
import { ThemeScript } from "@/lib/theme-script";
import { TanstackProvider } from "@/lib/tanstack-provider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <TanstackProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;
export { metadata };

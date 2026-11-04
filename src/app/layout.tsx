import "./globals.css";
import { TanstackProvider } from "@/components/ui/tanstack-provider";

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "Study Hard, Guyz",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col">
        <TanstackProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;

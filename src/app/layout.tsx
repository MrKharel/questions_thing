import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TanstackProvider } from "@/components/ui/tanstack-provider";

import type { Metadata } from "next";
import type { ReactNode } from "react";

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
            <Toaster />
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;

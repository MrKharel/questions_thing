import "./globals.css";
import { Fira_Code, Geist } from "next/font/google";
import { cn } from "cn";

import { TanstackProvider } from "@/components/ui/tanstack-provider";

import type { Metadata } from "next";
import type { ReactNode } from "react";

const sans = Geist({
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  subsets: ["latin"],
});
const monospace = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Study Hard, Guyz",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={cn(sans.variable, monospace.variable)} suppressHydrationWarning>
      <body className="flex flex-col">
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
};

export default RootLayout;

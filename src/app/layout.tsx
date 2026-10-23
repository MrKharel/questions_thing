import "./globals.css";
import { Fira_Code, Geist } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cn } from "cn";

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
    <html
      lang="en"
      className={cn(sans.variable, monospace.variable)}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

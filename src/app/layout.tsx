import "./globals.css";

import { themeProvider } from "@/lib/theme-provider";

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
        <script
          dangerouslySetInnerHTML={{
            __html: `(${themeProvider.toString()})()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
export { metadata };

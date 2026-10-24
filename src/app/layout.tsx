import "./globals.css";
import { cn } from "cn";
import { Fira_Code, Geist } from "next/font/google";

import { TanstackProvider } from "@/lib/tanstack-provider";

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
			<body>
				<TanstackProvider>{children}</TanstackProvider>
			</body>
		</html>
	);
};

export default RootLayout;

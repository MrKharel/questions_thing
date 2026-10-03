import "./globals.css";
import { Inter, Oxanium } from "next/font/google";
import { cn } from "cn";

import { TanstackProvider } from "@/lib/tanstack-provider";

import type { Metadata } from "next";

const oxanium = Oxanium({
	subsets: ["latin"],
	variable: "--font-heading",
});
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "I'll decide the name later",
	description: "I'll decide the description later",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={cn("h-full antialiased", inter.variable, oxanium.variable)}
		>
			<body>
				<TanstackProvider>{children}</TanstackProvider>
			</body>
		</html>
	);
}

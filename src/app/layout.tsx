import type { Metadata } from "next";
import { Inter, Oxanium } from "next/font/google";
import "./globals.css";
import { cn } from "cn";

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
			<body>{children}</body>
		</html>
	);
}

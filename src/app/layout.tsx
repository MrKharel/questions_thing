import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "cn";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "I'll decide the name later",
	description: "I'll decide the description later",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={cn("h-full antialiased", "font-sans", inter.variable)}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}

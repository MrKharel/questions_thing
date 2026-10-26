"use client";
import { PlusIcon, UserPlusIcon } from "lucide-react";

import { Header } from "@/components/header";
import { Navbar } from "@/components/navbar";

export default function NewClassPage({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<Navbar
				links={[
					{ label: "Join", url: "/class/new/join", icon: UserPlusIcon },
					{ label: "Create", url: "/class/new/create", icon: PlusIcon },
				]}
			/>
			{children}
		</>
	);
}

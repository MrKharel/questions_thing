"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const AuthLayout = (props: { children: React.ReactNode }) => {
	const pathname = usePathname();

	return (
		<>
			<section className="flex h-14 px-4 md:px-12 flex justify-between items-center">
				<div></div>
				<Link href={pathname === "/register" ? "/login" : "/register"}>
					<Button variant="outline" size="sm">
						{pathname === "/register" ? "Login" : "Register"}
					</Button>
				</Link>
			</section>

			{props.children}
		</>
	);
};

export { AuthLayout };

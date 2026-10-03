"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FormWrapper } from "./components/form";
import { Button } from "@/components/ui/button";

const AuthLayout = (props: { children: React.ReactNode }) => {
	const pathname = usePathname();

	return (
		<>
			<header className="h-14 px-4 md:px-12 flex justify-between items-center">
				<div></div>
				{(pathname === "/register" || pathname === "/login") && (
					<Link href={pathname === "/register" ? "/login" : "/register"}>
						<Button variant="outline" size="sm">
							{pathname === "/register" ? "Login" : "Register"}
						</Button>
					</Link>
				)}
			</header>

			<FormWrapper>{props.children}</FormWrapper>
		</>
	);
};

export { AuthLayout };

"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "cn";

import type { LucideIcon } from "lucide-react";

export type NavLink = {
	label: string;
	url: string;
	activeUrl?: string;
	icon?: LucideIcon;
};

export function Navbar({ links, className }: { className?: string; links: NavLink[] }) {
	return (
		<nav aria-label="Main navigation" className={cn("border-b border-border bg-sidebar", className)}>
			<div className="flex gap-1 overflow-x-auto">
				{links.map((link, index) => (
					<NavLink key={index} {...link} />
				))}
			</div>
		</nav>
	);
}

function NavLink({ label, url, activeUrl, icon: Icon }: NavLink) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const tab = searchParams.get("tab");

	const path = tab ? `${pathname}?tab=${tab}` : `${pathname}`;
	const active = path === (activeUrl ?? url);

	return (
		<Link
			href={url}
			aria-current={active ? "page" : undefined}
			className={cn(
				"relative inline-flex shrink-0 items-center gap-2 px-3 pb-3 text-sm font-medium",
				"text-muted-foreground transition-colors hover:text-foreground",
				"after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:content-['']",
				active ? "text-foreground after:bg-primary" : "after:bg-transparent",
			)}
		>
			{Icon && <Icon className="size-4" aria-hidden="true" />}
			{label}
		</Link>
	);
}

"use client";

import Link from "next/link";

import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
} from "@/components/ui/sidebar";

import type { LucideIcon } from "lucide-react";

type SidebarLink = {
	label: string;
	url: string;
	icon: LucideIcon;
};

export type SidebarLinks = SidebarLink[];

type NavMainProps = {
	items: SidebarLinks;
};

export function NavMain({ items }: NavMainProps) {
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuButton
						key={item.label}
						tooltip={item.label}
						render={<Link href={item.url} />}
					>
						{<item.icon />}
						<span>{item.label}</span>
					</SidebarMenuButton>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}

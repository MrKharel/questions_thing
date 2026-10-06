"use client";

import Link from "next/link";

import type { SidebarLinks } from "@/components/nav-main";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";

type SidebarProps = React.ComponentProps<typeof Sidebar> & {
	links: SidebarLinks;
};

export function AppSidebar({ links, ...props }: SidebarProps) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu className="flex flex-row justify-between items-center">
					<SidebarMenuItem className="flex-w *:w-full">
						<SidebarMenuButton size="lg" render={<Link href="#" />}>
							<div className="font-heading grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium text-lg">
									QuestionThings
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>

					<SidebarTrigger />
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<NavMain items={links} />
			</SidebarContent>

			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
		</Sidebar>
	);
}

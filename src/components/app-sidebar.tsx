"use client";

import Link from "next/link";

import type { SidebarLinks } from "@/components/nav-main";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarProps = React.ComponentProps<typeof Sidebar> & {
  links: SidebarLinks;
};

export function AppSidebar({ links, ...props }: SidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu className="flex flex-row justify-between items-center">
          <SidebarMenuItem className="flex-w *:w-full">
            <SidebarMenuButton render={<Link href="#" />}>
              <div className="font-heading grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-lg">
                  QuestionThings
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={links} />
      </SidebarContent>
    </Sidebar>
  );
}

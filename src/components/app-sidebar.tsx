"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { Sidebar, SidebarContent, SidebarFooter } from "@/components/ui/sidebar";
import { Settings2Icon, CircleHelpIcon } from "lucide-react";

export type NavItem = {
  title: string;
  url: string;
  icon?: React.ReactNode;
};

const data = {
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <CircleHelpIcon />,
    },
  ],
};
export function AppSidebar({ items, ...props }: React.ComponentProps<typeof Sidebar> & { items: NavItem[] }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarContent>
        <NavMain items={items} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

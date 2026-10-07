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
            render={
              <Link
                href={item.url}
                className="flex items-center text-muted-foreground hover:text-secondary-foreground"
              />
            }
          >
            {<item.icon />}
            <span>{item.label}</span>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

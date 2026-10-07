"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/components/header";

import type { SidebarLinks } from "@/components/nav-main";
import type { ReactNode } from "react";
import { HomeIcon } from "lucide-react";
import { Navbar } from "@/components/navbar";

type ClassLayoutProps = {
  children: ReactNode;
  id: string;
};

const ClassLayout = ({ children, id }: ClassLayoutProps) => {
  const sidebarLinks: SidebarLinks = [
    { label: "Home", url: `/classes/${id}`, icon: HomeIcon },
  ];

  return (
    <SidebarProvider>
      <AppSidebar links={sidebarLinks} />

      <SidebarInset>
        <Header />
        <Navbar
          navItems={[
            { label: "Overview", url: `/classes/${id}` },
            { label: "Assignments", url: `/classes/${id}/assignments` },
            { label: "Members", url: `/classes/${id}/members` },
            { label: "Settings", url: `/classes/${id}/settings` },
          ]}
        />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ClassLayout;

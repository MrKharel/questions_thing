"use client";

import { useParams } from "next/navigation";
import { BookOpenIcon } from "lucide-react";

import { Navbar } from "@/components/navbar";

import type { NavItem } from "@/components/navbar";
import type { ReactNode } from "react";

const ClassLayoutComponent = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const { class_id } = params;

  const navItems: NavItem[] = [
    { label: "Overview", url: `/class/${class_id}`, icon: BookOpenIcon },
  ];

  return (
    <>
      <Navbar navItems={navItems} />
      {children}
    </>
  );
};

export { ClassLayoutComponent };

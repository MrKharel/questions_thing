"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "cn";

import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

export type NavItem = {
  label: string;
  url: string;
  icon?: LucideIcon;
};

type NavbarProps = ComponentPropsWithoutRef<"nav"> & {
  navItems: NavItem[];
};

const Navbar = ({ navItems, className, ...props }: NavbarProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  return (
    <nav
      aria-label="Main navigation"
      className={cn("border-b border-border bg-sidebar", className)}
      {...props}
    >
      <div className="flex gap-1 overflow-x-auto">
        {navItems.map((item) => {
          const path = tab ? `${pathname}?tab=${tab}` : `${pathname}`;
          const active = path === item.url;

          console.log({ path, pathname, active, url: item.url });

          return <NavItem key={item.url} {...item} active={active} />;
        })}
      </div>
    </nav>
  );
};

type NavItemProps = NavItem & {
  active: boolean;
};

const NavItem = ({ label, url, icon: Icon, active }: NavItemProps) => (
  <Link
    href={url}
    aria-current={active ? "page" : undefined}
    className={cn(
      "relative inline-flex shrink-0 items-center gap-2 px-3 py-3 text-sm font-medium",
      "text-muted-foreground transition-colors hover:text-foreground",
      "after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:content-['']",
      active ? "text-foreground after:bg-primary" : "after:bg-transparent",
    )}
  >
    {Icon && <Icon className="size-4" aria-hidden="true" />}
    {label}
  </Link>
);

export { Navbar };

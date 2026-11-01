"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "cn";

import type { LucideIcon } from "lucide-react";

type NavLink = {
  label: string;
  url: string;
  icon?: LucideIcon;
};

function Navbar({ links }: { links: NavLink[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = `${pathname}?${searchParams.toString()}`;
    console.log(url);
    setUrl(url);
  }, [pathname, searchParams]);

  return (
    <nav className="flex items-center gap-2 h-10 px-2 bg-sidebar">
      {links.map((link, index) => {
        const isActive = link.url === url;

        return (
          <Link
            key={index}
            href={link.url}
            className={cn(
              "px-2 py-1 font-meduim text-foreground/80 w-fit relative",
              "after:content-[''] after:h-0.5 after:w-full after:bottom-0 after:left-0 after:absolute after:rounded-md",
              isActive && "after:bg-primary text-foreground/90",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export { Navbar };

"use client";

import { useSearchParams } from "next/navigation";
import { BookOpenIcon, InboxIcon, UserIcon } from "lucide-react";

import { Navbar, type NavItem } from "@/components/navbar";
import { Profile, HomeTab } from "./components/";

const navItems: NavItem[] = [
  { label: "Home", url: "/", icon: BookOpenIcon },
  { label: "Profile", url: "/?tab=profile", icon: UserIcon },
  { label: "Inbox", url: "/?tab=inbox", icon: InboxIcon },
];

const Home = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  return (
    <>
      <Navbar navItems={navItems} />

      <div className="flex flex-col md:flex-row gap-4 md:gap-12 *:h-full *:w-full p-4 md:p-12">
        <Profile />

        <div className="w-full">{!tab && <HomeTab />}</div>
      </div>
    </>
  );
};

export { Home };

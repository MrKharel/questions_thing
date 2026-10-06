"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheckIcon,
  BellIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  Link,
  LogOutIcon,
  SparklesIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@base-ui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser() {
  return (
    <Suspense fallback={<>User</>}>
      <NavUserContent />
    </Suspense>
  );
}

const NavUserContent = () => {
  const { isMobile } = useSidebar();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await fetch("/api/users/me");
      const result = await res.json();
      if (!res.ok || !result.success) {
        return null;
      }
      return result.data;
    },
  });

  if (!isLoading && !profile) {
    return <>null</>;
  }

  if (!profile) {
    return <>null</>;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-muted hover:bg-muted/70 rounded-sm"
              />
            }
          >
            <Profile
              avatar={profile.avatar}
              username={profile.username}
              email={profile.email}
            />

            <ChevronsUpDownIcon
              className="ml-auto text-muted-foreground hover:text-secondary-foreground transition-colors"
              size={16}
            />
          </DropdownMenuTrigger>

          <Content
            avatar={profile.avatar}
            username={profile.username}
            email={profile.email}
          />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

type Profile = {
  avatar: string | null;
  email: string;
  username: string;
};

const Content = ({ avatar, email, username }: Profile) => {
  const router = useRouter();

  return (
    <DropdownMenuContent>
      <DropdownMenuItem
        render={<SidebarMenuButton onClick={() => router.push("/me")} />}
      >
        <Profile avatar={avatar} email={email} username={username} />
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

const Profile = ({ avatar, username, email }: Profile) => {
  return (
    <>
      <Avatar>
        <AvatarImage src={avatar ?? ""} alt={username} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium text-secondary-foreground">
          {username}
        </span>
        <span className="truncate text-xs text-muted-foreground">{email}</span>
      </div>
    </>
  );
};

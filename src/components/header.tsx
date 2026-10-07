"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import {
  InboxIcon,
  SearchIcon,
  BellIcon,
  ChevronRightIcon,
  SettingsIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

const SEGMENT_LABELS: Record<string, string> = {
  inbox: "Inbox",
  me: "Profile",
  settings: "Settings",
  dashboard: "Dashboard",
  projects: "Projects",
  messages: "Messages",
};

const formatSegment = (segment: string) =>
  SEGMENT_LABELS[segment] ??
  segment.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-2 bg-sidebar px-3 backdrop-blur sm:px-4">
      <section className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="hover:text-secondary-foreground" />
        <Separator orientation="vertical" className="mr-1 !h-5" />
        <Breadcrumbs />
      </section>

      <section className="flex items-center gap-1 sm:gap-2">
        <SearchButton />
        <NotificationsButton />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={
                <Link href="/inbox" aria-label="Inbox">
                  <InboxIcon className="size-5" />
                </Link>
              }
            />
            <TooltipContent>Inbox</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Profile />
      </section>
    </header>
  );
};

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <Breadcrumb className="hidden sm:block">
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={href}>
              {index > 0 && (
                <BreadcrumbSeparator>
                  <ChevronRightIcon className="size-3.5" />
                </BreadcrumbSeparator>
              )}

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink render={<Link href={href} />}>
                    {formatSegment(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const SearchButton = () => (
  <Button
    variant="outline"
    size="sm"
    className="hidden h-9 w-56 justify-start gap-2 px-3 text-muted-foreground md:flex lg:w-64"
    onClick={() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "k", metaKey: true }),
      );
    }}
  >
    <SearchIcon className="size-4" />
    <span className="text-sm">Search…</span>
    <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
      <span className="text-xs">⌘</span>K
    </kbd>
  </Button>
);

const NotificationsButton = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-md"
            aria-label="Notifications"
          >
            <BellIcon className="size-5" />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-background" />
          </Button>
        }
      />
      <TooltipContent>Notifications</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const Profile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const res = await fetch("/api/users/me");
      const result = await res.json();
      if (!result.success) return null;
      return result.data as {
        username: string;
        email?: string;
        avatar?: string | null;
      };
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <Skeleton className="size-9 rounded-full" />;
  }

  if (!profile) {
    return (
      <Button variant="outline" size="sm" render={<Link href="/login" />}>
        Sign in
      </Button>
    );
  }

  const initials = profile.username?.substring(0, 2).toUpperCase() ?? "??";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            className="rounded-full outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Open user menu"
          >
            <Avatar className="size-9 border">
              <AvatarImage src={profile.avatar ?? ""} alt={profile.username} />
              <AvatarFallback className="font-serif text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </button>
        }
      />

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{profile.username}</span>
          {profile.email && (
            <span className="truncate text-xs font-normal text-muted-foreground">
              {profile.email}
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem render={<Link href="/me" />}>
          <UserIcon className="mr-2 size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem render={<Link href="/settings" />}>
          <SettingsIcon className="mr-2 size-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-rose-600 focus:text-rose-600"
          onClick={() => {
            // await fetch("/api/auth/logout", { method: "POST" });
            // router.push("/login");
          }}
        >
          <LogOutIcon className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { Header };

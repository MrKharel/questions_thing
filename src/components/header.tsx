"use client";

import Link from "next/link";
import { InboxIcon } from "lucide-react";
import { cn } from "cn";
import { useProfileQuery } from "@/hooks/use-profile";

import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "./ui/input";

import type { ComponentProps } from "react";

type HeaderProps = ComponentProps<"div"> & {};

const Header = ({ className, ...rest }: HeaderProps) => {
  return (
    <header
      className={cn(
        "flex justify-between items-center h-12 px-4 bg-sidebar",
        className,
      )}
      {...rest}
    >
      <div></div>

      <div className="flex items-center gap-2 [&>a]:px-2 [&>button]:px-2">
        <Input
          className={"h-8 bg-muted/70 border border-border"}
          placeholder="Ctrl + K :: Search"
        />
        <Button
          variant="outline"
          size={"sm"}
          nativeButton={false}
          render={<Link href="/inbox" />}
        >
          <InboxIcon size={16} />
        </Button>
        <Profile />
      </div>
    </header>
  );
};

const Profile = () => {
  const profileQuery = useProfileQuery();

  return (
    <div>
      <Avatar className={"size-9"}>
        <AvatarImage src={profileQuery.data?.avatar ?? ""}></AvatarImage>
        <AvatarFallback>
          {profileQuery.data?.username.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export { Header };

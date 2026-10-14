"use client";

import { useQuery } from "@tanstack/react-query";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import type { Profile, ApiResponse } from "@/app/api/types";

const Profile = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["user_profile"],
    queryFn: async () => {
      const res = await fetch("/api/users/me");
      const result = (await res.json()) as ApiResponse<Profile>;
      if (!result.success) return null;
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading || !profile) {
    return <></>;
  }

  return (
    <aside className="flex w-full flex-row md:items-center gap-5 md:max-w-60 md:flex-col md:items-stretch">
      <Avatar className="h-20 w-20 shrink-0 border shadow-sm md:aspect-square md:h-auto md:w-full">
        <AvatarImage
          src={profile.avatar ?? undefined}
          alt={`${profile.username}'s avatar`}
          className="object-cover"
        />
        <AvatarFallback className="bg-muted font-serif text-2xl font-bold uppercase text-foreground md:text-7xl">
          {profile.username.slice(0, 2)}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col gap-5">
        <div className="min-w-0 space-y-1">
          <h1 className="truncate text-xl font-bold tracking-wide text-foreground">
            {profile.display_name}
          </h1>
          <p className="truncate text-sm font-light text-muted-foreground">
            {profile.username}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-foreground/90">
          {profile.bio}
        </p>

        <Button
          variant="outline"
          className="w-full"
          nativeButton={false}
          render={<Link href="/settings/profile" />}
        >
          Edit Profile
        </Button>
      </div>
    </aside>
  );
};

export { Profile };

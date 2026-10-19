"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpenIcon, CalendarIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { dateFormatter } from "@/lib/date-formatter";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Class } from "@/lib/types";

// constants
const CLASSES_ENDPOINT = "/api/classes";
const CLASSES_QUERY_KEY = ["classes"] as const;
const CLASSES_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const SKELETON_COUNT = 4;

// types
type NoResultsProps = { search: string };

const HomeTab = () => {
  // current text in the search box (kept exactly as typed)
  const [search, setSearch] = useState("");

  const { data: classes, isLoading: classesLoading } = useQuery<Class[]>({
    queryKey: CLASSES_QUERY_KEY,
    queryFn: async () => {
      const result = await fetch(CLASSES_ENDPOINT).then((req) => req.json());
      if (!result.success) return null;
      return result.data;
    },
    staleTime: CLASSES_STALE_TIME,
  });

  if (!classesLoading && (!classes || classes.length === 0))
    return <NoClasses />;

  const filtered = classes!.filter((virtualClass) =>
    virtualClass.subject.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="space-y-4">
      <Header search={search} onSearch={setSearch} filtered={filtered} />

      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">Classes</h2>
        <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {filtered.length}
        </span>
      </div>

      {classesLoading ? (
        <ClassesSkeleton />
      ) : filtered.length === 0 ? (
        <NoClasses />
      ) : (
        <div>
          {filtered.map((virtualClass) => (
            <Link
              key={virtualClass.id}
              href={`/class/${virtualClass.id}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-t last:border-b border-border py-3 px-8"
            >
              <div className="flex h-full flex-col gap-3">
                <div className="flex flex-col">
                  <h3 className="truncate text-lg font-semibold text-foreground leading-7">
                    {virtualClass.subject}
                  </h3>

                  {virtualClass.description && (
                    <p className="line-clamp-2 text-sm text-foreground/84">
                      {virtualClass.description}
                    </p>
                  )}
                </div>
                <p className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground font-semibold leading-7">
                  <CalendarIcon size={14} />
                  Created{" "}
                  {dateFormatter.format(new Date(virtualClass.created_at))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

type HeaderProps = {
  search: string;
  onSearch: (value: string) => void;
  filtered: Class[];
};

// search + create
const Header = ({ search, onSearch, filtered }: HeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex items-center gap-2">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search your classes"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onKeyDown={(e) => {
            if (filtered.length === 1 && e.key === "Enter") {
              router.push(`/class/${filtered[0].id}`);
            }
          }}
        />
      </div>

      <Button nativeButton={false} render={<Link href={"/class/new/join"} />}>
        <PlusIcon size={16} />
        New
      </Button>
    </header>
  );
};

/* - - - - - - - - - - - - STATES - - - - - - - - - - - - - */
const ClassesSkeleton = () => {
  return (
    <div className="grid grid-cols-1">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 py-3 px-8 border-t border-border"
        >
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-5 w-2/5" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-2/3" />
          </div>
          <Skeleton className="h-3 w-1/5" />
        </div>
      ))}
    </div>
  );
};

// user has no classes at all
const NoClasses = () => {
  return (
    <section className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-16 text-center">
      <BookOpenIcon className="h-8 w-8 text-muted-foreground" />
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">
          No classes yet
        </h2>
        <p className="text-sm text-muted-foreground">
          Create a class or ask your teacher for an invite to get started.
        </p>
      </div>
      <Button>
        <PlusIcon size={16} />
        New class
      </Button>
    </section>
  );
};

// search matched nothing
const NoResults = ({ search }: NoResultsProps) => {
  return (
    <p className="rounded-lg border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
      No classes match &quot;{search}&quot;.
    </p>
  );
};

export { HomeTab };

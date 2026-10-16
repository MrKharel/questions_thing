"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpenIcon, CalendarIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { dateFormatter } from "@/lib/date-formatter";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import type { Class } from "@/lib/types";

// constants
const CLASSES_ENDPOINT = "/api/classes";
const CLASSES_QUERY_KEY = ["classes"] as const;
const CLASSES_STALE_TIME = 5 * 60 * 1000; // 5 minutes
const SKELETON_COUNT = 4;

// types
type HeaderProps = { search: string; onSearch: (value: string) => void };
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

  if (classesLoading) return <ClassesSkeleton />;
  if (!classes || classes.length === 0) return <NoClasses />;

  // filter by subject, case-insensitive
  const filtered = classes.filter((virtualClass) =>
    virtualClass.subject.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="space-y-4">
      <Header search={search} onSearch={setSearch} />

      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-foreground">Classes</h2>
        <span className="rounded-full border px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {filtered.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <NoResults search={search} />
      ) : (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          {filtered.map((virtualClass) => (
            <ClassCard key={virtualClass.id} virtualClass={virtualClass} />
          ))}
        </div>
      )}
    </section>
  );
};

// search + create
const Header = ({ search, onSearch }: HeaderProps) => {
  return (
    <header className="flex items-center gap-2">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search your classes"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Button>
        <PlusIcon size={16} />
        New
      </Button>
    </header>
  );
};

// a single class in the list
const ClassCard = ({ virtualClass }: { virtualClass: Class }) => {
  return (
    <Link
      href={`/class/${virtualClass.id}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="rounded-md p-0 py-2 hover:bg-card/80">
        <CardContent className="flex h-full flex-col gap-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="truncate text-base font-semibold">
              {virtualClass.subject}
            </CardTitle>

            {virtualClass.description && (
              <CardDescription className="line-clamp-2 text-sm">
                {virtualClass.description}
              </CardDescription>
            )}
          </div>
          <p className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarIcon className="h-3.5 w-3.5" />
            Created {dateFormatter.format(new Date(virtualClass.created_at))}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

/* - - - - - - - - - - - - STATES - - - - - - - - - - - - - */
const ClassesSkeleton = () => {
  return (
    <section className="animate-pulse space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-9 flex-1 rounded-md bg-muted" />
        <div className="h-9 w-20 rounded-md bg-muted" />
      </div>
      <div className="h-6 w-24 rounded bg-muted" />
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div key={i} className="h-24 rounded-lg border bg-muted/50" />
        ))}
      </div>
    </section>
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

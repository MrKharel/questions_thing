import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassCard } from "./class-card";

import type { ApiResponse, Class } from "@/app/api/types";
import { PlusIcon } from "lucide-react";

const HomeTab = () => {
  const { data: classes, isLoading: isClassesLoading } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("/api/users/me/classes");
      const result = (await res.json()) as ApiResponse<Class[]>;
      if (!result.success) return null;
      return result.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isClassesLoading || !classes) {
    return <>this is either loading, or the classes aren't found.</>;
  }

  return (
    <section className="space-y-4">
      <div className="flex gap-2">
        <Input placeholder="Search your classes" />
        <Button>
          <PlusIcon size={16} />
          New
        </Button>
      </div>

      <h2 className="text-lg font-semibold text-foreground">Classes</h2>

      <div className="grid gap-4 grid-cols-2">
        {classes.map((virtualClass) => (
          <ClassCard key={virtualClass.id} virtualClass={virtualClass} />
        ))}
      </div>
    </section>
  );
};

export { HomeTab };

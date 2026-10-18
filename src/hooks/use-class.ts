import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Class } from "@/lib/types";

// constants
const CLASSES_QUERY_KEY = ["class"] as const;
const CLASSES_API_ENDPOINT = "api/classes/";
const CLASS_STALE_TIME = 5 * 60 * 1000; // five-minutes

export const useClassesQuery = () => {
  return useQuery<Class[]>({
    queryKey: CLASSES_QUERY_KEY,
    queryFn: async () => {
      const result = await fetch(CLASSES_API_ENDPOINT).then((req) =>
        req.json(),
      );
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: CLASS_STALE_TIME,
  });
};

export const useClassQuery = (id: string) => {
  return useQuery<Class>({
    queryKey: [id] as const,
    queryFn: async () => {
      const result = await fetch(`/api/classes/${id}`).then((req) =>
        req.json(),
      );
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: CLASS_STALE_TIME,
  });
};

type MutationProps = {
  id: string;
  subject?: string;
  description?: string;
  visibility?: "private" | "public";
  max_members?: number;
  allow_late_submissions?: boolean;
  members_can_see_eachother?: boolean;
  students_can_comment?: boolean;
};

export const useUpdateClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...rest }: MutationProps) => {
      const result = await fetch(`/api/classes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest }),
      }).then((result) => result.json());
      console.log({ result });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: CLASSES_QUERY_KEY });
      const previous = queryClient.getQueryData<Class>(CLASSES_QUERY_KEY);
      queryClient.setQueryData<Class>(CLASSES_QUERY_KEY, (old) => {
        if (!old) return old;
        return { ...old, ...variables };
      });
      return { previous };
    },
  });
};

export const useCreateClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...rest }: MutationProps) => {
      const result = await fetch(`/api/classes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...rest }),
      }).then((result) => result.json());
      console.log({ result });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: CLASSES_QUERY_KEY });
      const previous = queryClient.getQueryData<Class>(CLASSES_QUERY_KEY);
      queryClient.setQueryData<Class>(CLASSES_QUERY_KEY, (old) => {
        if (!old) return old;
        return { ...old, ...variables };
      });
      return { previous };
    },
  });
};

export const useDeleteClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: Pick<MutationProps, "id">) => {
      const result = await fetch(`/api/classes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((result) => result.json());
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: CLASSES_QUERY_KEY });
      const previous = queryClient.getQueryData<Class>(CLASSES_QUERY_KEY);
      queryClient.setQueryData<Class>(CLASSES_QUERY_KEY, (old) => {
        if (!old) return old;
        return { ...old, ...variables };
      });
      return { previous };
    },
  });
};

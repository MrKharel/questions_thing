import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Class } from "@/lib/types";

// constants
const CLASSES_QUERY_KEY = ["class"] as const;
const CLASSES_API_ENDPOINT = "api/classes/";
const CLASS_STALE_TIME = 5 * 60 * 1000; // five-minutes

const useClassesQuery = () => {
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

const useClassQuery = (id: string) => {
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

type MutationProps = Partial<
  Pick<
    Class,
    | "subject"
    | "description"
    | "visibility"
    | "max_members"
    | "allow_late_submissions"
    | "members_can_see_eachother"
    | "students_can_comment"
  >
>;
type MutationContext = { previous?: Class; previousList?: Class[] };

const useUpdateClassMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Class, Error, MutationProps, MutationContext>({
    mutationFn: async (variables) => {
      const res = await fetch(`/api/classes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(variables),
      }).then((req) => req.json());
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: [id] });
      await queryClient.cancelQueries({ queryKey: CLASSES_QUERY_KEY });

      const previous = queryClient.getQueryData<Class>([id]);
      const previousList = queryClient.getQueryData<Class[]>(CLASSES_QUERY_KEY);

      queryClient.setQueryData<Class>([id], (old) => {
        if (!old) return old;
        return { ...old, ...variables };
      });
      queryClient.setQueryData<Class[]>(CLASSES_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((item) =>
          item.id === id ? { ...item, ...variables } : item,
        );
      });

      return { previous, previousList };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData([id], context.previous);
      }
      if (context?.previousList) {
        queryClient.setQueryData(CLASSES_QUERY_KEY, context.previousList);
      }
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Class>([id], updated);
      queryClient.setQueryData<Class[]>(CLASSES_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((item) => (item.id === id ? updated : item));
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [id] });
      queryClient.invalidateQueries({ queryKey: CLASSES_QUERY_KEY });
    },
  });
};

type CreateProps = Pick<Class, "subject"> & MutationProps;

const useCreateClassMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Class, Error, CreateProps>({
    mutationFn: async (variables) => {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(variables),
      }).then((req) => req.json());
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: (created) => {
      queryClient.setQueryData<Class>([created.id], created);
      queryClient.setQueryData<Class[]>(CLASSES_QUERY_KEY, (old) => {
        if (!old) return old;
        return [...old, created];
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: CLASSES_QUERY_KEY });
    },
  });
};

const useDeleteClassMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<Class, Error, MutationProps, MutationContext>({
    mutationFn: async () => {
      const result = await fetch(`/api/classes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }).then((result) => result.json());
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [id] });
      await queryClient.cancelQueries({ queryKey: CLASSES_QUERY_KEY });

      const previous = queryClient.getQueryData<Class>([id]);
      const previousList = queryClient.getQueryData<Class[]>(CLASSES_QUERY_KEY);

      queryClient.setQueryData<null>([id], () => null);
      queryClient.setQueryData<Class[]>(CLASSES_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.filter((clas) => clas.id !== id);
      });

      return { previous, previousList };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData([id], context.previous);
      }
      if (context?.previousList) {
        queryClient.setQueryData(CLASSES_QUERY_KEY, context.previousList);
      }
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Class>([id], updated);
      queryClient.setQueryData<Class[]>(CLASSES_QUERY_KEY, (old) => {
        if (!old) return old;
        return old.map((item) => (item.id === id ? updated : item));
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [id] });
      queryClient.invalidateQueries({ queryKey: CLASSES_QUERY_KEY });
    },
  });
};

export {
  useClassQuery,
  useClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
};

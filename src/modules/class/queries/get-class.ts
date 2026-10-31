import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getClass, postClass, patchClass } from "../actions/class-actions";

import type { Class } from "../actions/class-actions";

const CLASS_QUERY_KEY = ["all-user-class"] as const;
const CLASS_STALE_TIME = 20 * 60 * 1000; // 20 mins

export function useGetAllClass() {
  return useQuery({
    queryKey: CLASS_QUERY_KEY,
    queryFn: getClass,
    staleTime: CLASS_STALE_TIME,
  });
}

export function useGetClass() {}

export function usePostClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postClass,
    onSuccess: (result) => {
      queryClient.setQueryData(CLASS_QUERY_KEY, (old: Class[]) => ({
        ...old,
        result,
      }));
    },
  });
}

export function usePatchClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchClass,
    onMutate: async () => {},
    onSuccess: async () => {},
    onError: async () => {},
  });
}

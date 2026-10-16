import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Profile } from "@/lib/types";

// constants
const PROFILE_QUERY_KEY = ["user_profile"] as const;

export const useProfileQuery = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/users/me").then((req) => req.json());
      if (!res.success) return null;
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      display_name,
      avatar,
      bio,
      location,
    }: {
      username?: string;
      display_name?: string;
      avatar?: string;
      bio?: string;
      location?: string;
    }) => {
      const result = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, display_name, avatar, bio, location }),
      }).then((result) => {
        console.log(result);
        return result.json();
      });
      console.log(result);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: PROFILE_QUERY_KEY });
      const previous = queryClient.getQueryData<Profile>(PROFILE_QUERY_KEY);
      queryClient.setQueryData<Profile>(PROFILE_QUERY_KEY, (old) => {
        if (!old) return old;
        return { ...old, ...variables };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(PROFILE_QUERY_KEY, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
  });
};

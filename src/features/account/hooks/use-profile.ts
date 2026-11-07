import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchProfile } from "../_fetches/fetch-profile";
import { updateProfile } from "../_actions/update-profile";
import type { ProfilePatch, Profile } from "../_schemas/profile-schema";

const PROFILE_QUERY_KEY = ["user_profile"] as const;

export function useProfileQuery() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => fetchProfile(),
  });
}

export function useProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: ProfilePatch) => updateProfile(updates),
    onMutate: async (updates) => {
      await queryClient.cancelQueries({ queryKey: PROFILE_QUERY_KEY });
      const previousProfile = queryClient.getQueryData<Profile>(PROFILE_QUERY_KEY);
      queryClient.setQueryData<Profile>(PROFILE_QUERY_KEY, (old) => (old ? { ...old, ...updates } : old));
      return { previousProfile };
    },
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile);
    },
    onError: (_error, _updates, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(PROFILE_QUERY_KEY, context.previousProfile);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY,
      });
    },
  });
}

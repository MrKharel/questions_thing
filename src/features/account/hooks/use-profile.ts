import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchProfile } from "../_fetches/fetch-profile";

const PROFILE_QUERY_KEY = ["user_profile"] as const;

export function useProfileQuery(name?: string) {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => {
      if (name) fetchProfile({ name });
      else fetchProfile();
    },
  });
}

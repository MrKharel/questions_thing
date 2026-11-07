import { useQuery } from "@tanstack/react-query";

import { fetchAvatars } from "../_fetches/fetch-avatars";

const AVATAR_QUERY_KEY = ["all_avatars"] as const;

export function useAvatarsQuery() {
  return useQuery({
    queryKey: AVATAR_QUERY_KEY,
    queryFn: fetchAvatars,
  });
}

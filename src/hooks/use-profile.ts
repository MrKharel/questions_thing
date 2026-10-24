import { getProfile, updateProfile } from "@/actions/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Profile } from "@/actions/profile";

const PROFILE_QUERY_KEY = ["user-profile"] as const;

export function useProfileQuery() {
	return useQuery({
		queryKey: PROFILE_QUERY_KEY,
		queryFn: getProfile,
	});
}

export function useProfileMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,
		onMutate: (variables) => {
			queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
			const previous = queryClient.getQueryData(PROFILE_QUERY_KEY);
			queryClient.setQueryData(PROFILE_QUERY_KEY, (old: Profile) => ({ ...old, ...variables }));
			return { previous };
		},
		onError: (_error, _variables, context) => {
			if (context?.previous) {
				queryClient.setQueryData(PROFILE_QUERY_KEY, context.previous);
			}
		},
	});
}

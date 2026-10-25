import { getProfile, getProfileByUsername, updateProfile } from "@/actions/profile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { Profile } from "@/actions/profile";

const PROFILE_QUERY_KEY = ["user-profile"] as const;

export const profileKeys = {
	me: ["profile", "me"] as const,
	byUsername: (username: string) => ["profile", username] as const,
};

export function useProfileQuery() {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: profileKeys.me,
		queryFn: async () => {
			const profile = await getProfile();
			if (!("username" in profile)) throw profile;
			queryClient.setQueryData(profileKeys.byUsername(profile.username), profile);
			return profile;
		},
	});
}

export function useProfileQueryByUsername(username: string) {
	return useQuery({
		queryKey: profileKeys.byUsername(username),
		queryFn: async () => {
			const profile = await getProfileByUsername(username, { single: true });
			if (!("username" in profile)) throw profile;
			return profile;
		},
	});
}

export function useProfileMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProfile,
		onMutate: (variables) => {
			queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
			const previous = queryClient.getQueryData(PROFILE_QUERY_KEY);

			console.log({ variables, previous });

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


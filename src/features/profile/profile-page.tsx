"use client";
import { useProfileQueryByUsername } from "@/hooks/use-profile";

export function ProfilePage({ username }: { username: string }) {
	const profileQuery = useProfileQueryByUsername(username);

	if (profileQuery.isLoading) return <>loading</>;
	if (!profileQuery.data) return <>no user found. 404</>;

	const { data: profile } = profileQuery;

	return (
		<div>
			{profile.username} {profile.id}
		</div>
	);
}

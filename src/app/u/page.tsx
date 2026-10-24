"use client";

import { redirect } from "next/navigation";
import { useProfileQuery } from "@/hooks/use-profile";

export default function ProfileSubRoute() {
	const { data, isLoading } = useProfileQuery();
	if (isLoading) return <>loading</>;
	if (!data) return <>no user</>;

	redirect(`/u/${data.username}`);
}

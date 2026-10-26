import { getClassByTitle } from "@/actions/classes";
import { useQuery } from "@tanstack/react-query";

// const CLASS_QUERY_KEY = ["class-query-key"] as const;

export const profileKeys = {
	me: ["class"] as const,
	byTitle: (title: string) => [title] as const,
};

export function useClassQueryByTitle({ title, username }: { title: string; username: string }) {
	return useQuery({
		queryKey: profileKeys.byTitle(title),
		queryFn: () => getClassByTitle({ title, username }),
	});
}

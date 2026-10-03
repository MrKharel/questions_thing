"use server";

import { createClient } from "@/lib/clients/auth-db/server";

import { validate } from "@/lib/validate";

type Props = { username: string };

const registerProfile = async ({ username }: Props) => {
	const checks = validate({ username });
	if (!checks.valid) return { data: null, error: { message: checks.message } };

	const supabase = await createClient();

	const { error } = await supabase
		.from("profiles")
		.insert({ username, avatar: null });
	if (error) return { error: error };

	return {
		error: null,
	};
};

export { registerProfile };

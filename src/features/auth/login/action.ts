"use server";

import { createClient } from "@/lib/clients/auth-db/server";
import { validate } from "@/lib/validate";

const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const checks = validate({ email, password });
	if (!checks.valid) return { error: { message: checks.message } };

	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) return { error: error };

	return {
		error: null,
	};
};

export { login };

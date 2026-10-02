"use server";

import db from "@/lib/supabase/server";

import { validate } from "@/lib/validate";

const login = async (
	email: string,
	password: string,
): Promise<{
	data: null | Object;
	error: null | Object;
}> => {
	const checks = validate({ email, password });
	if (!checks.valid) return { data: null, error: { message: checks.message } };

	const supabase = await db();

	const { data, error } = await supabase.auth.loginWithPassword({
		email,
		password,
	});
	if (error) {
		console.log(error);
		return { data: null, error: error };
	}
	return { data: data, error: null };
};

export { login };

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/clients/auth-db/server";

import { validate } from "@/lib/validate";

type Props = { email: string; password: string };

const register = async ({ email, password }: Props) => {
	const checks = validate({ email, password });
	if (!checks.valid) return { error: { message: checks.message } };

	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({ email, password });
	if (error) return { error: error };
	redirect("/");
};

export { register };

"use server";

import db from "@/lib/supabase/server";

import { validate } from "@/lib/validate";

import type { ActionPromise } from "../types";

type Props = { email: string; password: string };

const register = async ({ email, password }: Props): ActionPromise => {
	const checks = validate({ email, password });
	if (!checks.valid) return { data: null, error: { message: checks.message } };

	const supabase = await db();

	const { data, error } = await supabase.auth.signUp({ email, password });

	return { data: null, error: { message: "The action for this isn't made" } };
};

export { register };

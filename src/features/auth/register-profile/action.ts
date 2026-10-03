"use server";

import { redirect } from "next/navigation";
import db from "@/lib/supabase/server";

import { validate } from "@/lib/validate";

import type { ActionPromise } from "../types";

type Props = { username: string };

const registerProfile = async ({ username }: Props): ActionPromise => {
	const checks = validate({ username });
	if (!chesks.valid) return { data: null, error: { message: checks.message } };

	const supabase = await db();

	const { data: user, error: userError } = await supabase.auth.getUser();
	if (userError || !user) redirect("/login");

	const { data, error } = await supabase
		.from("profiles")
		.insert({ id: user.id, username, avatar: null })
		.select();
	if (error) return { data: null, error: error };
	return { data, error };
};

export { registerProfile };

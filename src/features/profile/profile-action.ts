"use server";

import { createClient } from "@/lib/clients/auth-db/server";

const fetchProfile = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("profiles").select("*").single();
	if (error) return { data: null, error };
	return { data, error: null };
};

export { fetchProfile };

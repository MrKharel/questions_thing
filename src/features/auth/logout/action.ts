"use server";

import { createClient } from "@/lib/clients/auth-db/server";

const logout = async () => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signOut();
	return { error };
};

export { logout };

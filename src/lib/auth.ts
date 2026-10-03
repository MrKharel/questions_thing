"use server";

import { redirect } from "next/navigation";
import { createClient } from "./client/server";

const signInWithPassword = async (email: string, password: string) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({ email, password });
	if (error) return { error: error };
	redirect("/");
};

const signUp = async (email: string, password: string) => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: { emailRedirectTo: "/register/profile" },
	});
	if (error) return { error: error };
	return { error: error };
};

const signOut = async () => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signOut();
	return { error };
};

export { signInWithPassword, signUp, signOut };

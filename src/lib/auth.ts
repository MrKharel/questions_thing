"use server";

import { redirect } from "next/navigation";
import { createClient } from "./client/server";

const signInWithPassword = async (email: string, password: string) => {
	const supabase = await createClient();

	const { data: _data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});
	if (error) return { error: { message: error.message, code: error.code } };
	redirect("/home");
};

/**
 * What actually happens in backend is:
 * When the user is created successfully, it also creats a public.profiles row.
 * There'd be: { id, email, username }. Other's will be null.
 * Username is just everything before '@' in email.
 * Avatar is null from default.
 * If no email, random string of letters. The user will be prompted to change the username asap.
 */
const signUp = async (email: string, password: string) => {
	// TL;DR: this will also create a row in public.profiles btw.
	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: { emailRedirectTo: "/register/profile" },
	});
	if (error) return { error: { message: error.message, code: error.code } };
	return { error: null };
};

const signOut = async () => {
	const supabase = await createClient();

	const { error } = await supabase.auth.signOut();
	if (error) return { error: { message: error.message, code: error.code } };
	redirect("/login");
};

export { signInWithPassword, signOut, signUp };

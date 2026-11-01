"use server";

import createClient from "@/lib/supabase/server";

export async function loginWithPassword(email: string, password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}

export async function signup(email: string, password: string, userMetadata?: Record<string, unknown>) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: "/onboarding/login", data: { userMetadata } },
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}

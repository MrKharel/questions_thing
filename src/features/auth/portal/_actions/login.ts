"use server";
import supabaseClient from "@/lib/supabase/server";

export async function loginWithEmail(credentials: { email: string; password: string }) {
  const supabase = await supabaseClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}

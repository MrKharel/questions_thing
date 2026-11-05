"use server";
import supabaseClient from "@/lib/supabase/server";

export async function signup(credentials: { email: string; password: string }) {
  const supabase = await supabaseClient();
  const { error } = await supabase.auth.signUp(credentials);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}

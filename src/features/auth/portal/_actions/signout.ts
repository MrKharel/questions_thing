"use server";
import { redirect } from "next/navigation";
import supabaseClient from "@/lib/supabase/server";

export async function signout() {
  const supabase = await supabaseClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  redirect("/login");
}

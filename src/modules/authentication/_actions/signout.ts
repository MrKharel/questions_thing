"use server";

import { redirect } from "next/navigation";
import createClient from "@/lib/supabase/server";

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  redirect("/onboarding/login");
}

"use server";
import supabaseClient from "@/lib/supabase/server";

import { ProfileSchema, type ProfilePost } from "./schema-profile";

export async function postProfile(inserts: ProfilePost): Promise<ProfilePost | null> {
  const supabase = await supabaseClient();
  const { data, error } = await supabase.from("profile").insert(inserts).select("");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const parsed = ProfileSchema.safeParse(data);
  if (parsed.error) {
    console.error(error);
    throw new Error(parsed.error.message);
  }
  return parsed.data;
}

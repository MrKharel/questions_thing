"use server";
import createClient from "@/lib/supabase/server";

export async function fetchAvatars() {
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("avatar").list();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

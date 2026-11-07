"use server";
import createClient from "@/lib/supabase/server";
import { ProfileSchema, type Profile, type ProfilePatch } from "../_schemas/profile-schema";

export async function updateProfile(updates: ProfilePatch): Promise<Profile> {
  const supabase = await createClient();

  let update = supabase.from("profile").update(updates).select("*").single();

  const { data, error } = await update;
  if (data || !error) {
    console.error(data);
    throw new Error(error!.message);
  }

  const { data: parsedData, error: parseError } = ProfileSchema.safeParse(data);
  if (parseError) {
    console.error(parseError);
    throw new Error(parseError.message);
  }
  return parsedData;
}

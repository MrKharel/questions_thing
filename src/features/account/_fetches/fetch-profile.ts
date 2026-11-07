"use server";
import createClient from "@/lib/supabase/server";
import { ProfileSchema, type Profile } from "../_schemas/profile-schema";

type FetchProfileProps = {
  name?: string;
};

export function fetchProfile(props: { name: string }): Promise<Profile>;
export function fetchProfile(props?: { name?: undefined }): Promise<Profile[]>;
export async function fetchProfile({ name }: FetchProfileProps = {}): Promise<Profile | Profile[]> {
  const supabase = await createClient();

  if (name) {
    let query = supabase.from("profile").select("*").eq("name", name);

    const { data: profile, error: profileError } = await query;
    if (!profile || profileError) {
      console.error(profileError);
      throw new Error(profileError.message);
    }

    const { data: parsedData, error: parseError } = ProfileSchema.array().safeParse(profile);
    if (parseError) {
      console.error(parseError);
      throw new Error(parseError!.message);
    }
    return parsedData;
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user || userError) {
    console.error(userError);
    throw new Error(userError?.message);
  }

  let query = supabase.from("profile").select("*").eq("id", user.id).single();

  const { data: profile, error: profileError } = await query;
  if (!profile || profileError) {
    console.error(profileError);
    throw new Error(profileError!.message);
  }

  const { data: parsedData, error: parseError } = ProfileSchema.safeParse(profile);
  if (parseError) {
    console.error(parseError);
    throw new Error(parseError.message);
  }
  return parsedData;
}

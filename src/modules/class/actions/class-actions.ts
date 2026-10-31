"use server";

import z from "zod";
import createClient from "@/lib/supabase/server";

const Class = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullish(),
  created_by: z.uuid(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted_at: z.string().nullish(),
});

const PostClass = Class.omit({
  created_by: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
}).partial({ id: true });

const PatchClass = Class.omit({
  id: true,
  created_by: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
}).partial();

export type Class = z.infer<typeof Class>;
export type PostClass = z.infer<typeof PostClass>;
export type PatchClass = z.infer<typeof PatchClass>;

export async function getClass(): Promise<Class> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("class").select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const parsed = Class.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error(parsed.error.message);
  }
  return parsed.data;
}

export async function postClass(inserts: PostClass) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("class")
    .insert(inserts)
    .select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const parsed = Class.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error(parsed.error.message);
  }
  return parsed.data;
}

export async function patchClass(classId: string, patches: PatchClass) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("class")
    .update(patches)
    .eq("class_id", classId)
    .select("*");
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const parsed = Class.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error);
    throw new Error(parsed.error.message);
  }
  return parsed.data;
}

export async function deleteClass(classId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("class")
    .delete()
    .eq("class_id", classId);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return null;
}

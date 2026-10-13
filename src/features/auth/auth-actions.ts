"use server";

import { redirect } from "next/navigation";
import createClient from "@/lib/supabase/server";

export const signUp = async (email: string, password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: "/login" },
  });

  if (error) {
    console.log(error);
    return { error: { code: error.code, message: error.message } };
  }

  return { error: null };
};

export const signInWithPassword = async (email: string, password: string) => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    return { error: { code: error.code, message: error.message } };
  }

  redirect("/classes");
};

export const signOut = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: { code: error.code, message: error.message } };
  }

  redirect("/login");
};

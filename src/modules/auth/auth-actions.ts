"use server";
import createClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

/* ---------------------------------------- SIGNIN FUNCTIONS ---------------------------------------- */
export async function signinWithPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: { message: error.message } };
  }
  redirect("/");
}

/* ---------------------------------------- EMAIL PASSWORD RESET FUNCTIONS ---------------------------------------- */
export async function resetPasswordForEmail(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "/help/reset-password",
  });
  if (!error) {
    return { error: null };
  }
  return { error: { message: error.message } };
}

export async function updateUserPassword(password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: { message: error.message } };
  }
  return { error: null };
}

/* ---------------------------------------- SIGNUP FUNCTIONS ---------------------------------------- */
type SignupProps = {
  email: string;
  password: string;
  retypePassword: string;
};

export async function signupWithEmail({
  email,
  password,
  retypePassword,
}: SignupProps) {
  if (password !== retypePassword) {
    return { error: { message: "Passwords do not match" } };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: "/login" },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
    return { error: { message: error.message } };
  }

  return { error: null };
}

/* ---------------------------------------- SIGNOUT FUNCTIONS ---------------------------------------- */
export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut({});
  if (!error) redirect("/login");
}

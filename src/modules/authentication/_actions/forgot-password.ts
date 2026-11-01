"use server";

import createClient from "@/lib/supabase/server";

export async function sendResetPasswordEmail(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `/onboarding/reset-password` });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}

export async function resetPassword(password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return true;
}

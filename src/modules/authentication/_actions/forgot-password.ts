"use server";

import createClient from "@/lib/supabase/server";

export async function sendResetPasswordEmail(email: string) {
  const supabase = await createClient();

  const siteUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

  if (!siteUrl) {
    console.error({ message: "NEXT_PUBLIC_SITE_URL is not configured" });
    throw new Error("NEXT_PUBLIC_SITE_URL is not configured");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/onboarding/reset-password`,
  });

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

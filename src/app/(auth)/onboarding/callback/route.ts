import createClient from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error);
      throw new Error(error.message);
    }

    return NextResponse.redirect(`/onboarding/reset-password`);
  }

  return NextResponse.redirect(`/onboarding/forgot-password?error=auth`);
}

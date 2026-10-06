import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/client/server";

export const GET = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (!user || authError) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { data, error } = await supabase.from("classes").select("*");

    if (error) {
      return NextResponse.json(
        { success: false, message: "Unexpected Error Occured" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 501 },
    );
  }
};


export const POST = async (req: NextRequest) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (!user || authError) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json().catch(() => null);
    const name = body?.data?.username.trim();
    const subject = body?.data?.avatar;

    if (!name) {
      return NextResponse.json(
        { succss: false, message: "Name for the class must be provided" },
        { status: 301 },
      );
    }

    const inserts: { name: string; subject?: string } = { name };
    if (name) inserts.name = name;
    if (subject) inserts.subject = subject;

    const { data, error } = await supabase
      .from("classes")
      .insert(inserts)
      .eq("created_by", user.id);

    if (error) {
      return NextResponse.json(
        { success: false, message: "Unexpected Error Occured" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 501 },
    );
  }
};

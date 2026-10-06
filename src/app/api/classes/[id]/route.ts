import { createClient } from "@/lib/client/server";
import { NextRequest, NextResponse } from "next/server";
import {string} from "zod";

type Params = Promise<{ id: string }>;

type GETProps = {
  params: Params;
};

export const GET = async ({ params }: GETProps) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (!user || authError) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id } = await params;

    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("id", id);

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

export const PATCH = async (req: NextRequest, {params}: {params: Params}) => {
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

    const { id } = await params;
    const body = await req.json().catch(() => null)
    const name = body?.data?.name
    const subject = body?.data?.name

    if (!name || !subject) {
      return NextResponse.json({success: "Invalid Input"}, {status: 301})
    }

    const updates: { name?: string, subject?: string } = {}
    if (name) updates.name = name;
    if (subject) updates.subject = subject;

    const { data, error } = await supabase
      .from("classes")
      .update({ updates })
      .eq("id", id);

    if (!data || error) {
      return NextResponse.json(
        { success: false, message: "Unexpected Error Occured" },
        { status: 501 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500})
  }
}

export const DELETE = async ({ params }: { params: Params }) => {
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

    const { id } = await params;

    const { data, error } = await supabase
      .from("classes")
      .delete()
      .eq("id", id);

    if (!data || error) {
      return NextResponse.json(
        { success: false, message: "Unexpected Error Occured" },
        { status: 501 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
};

import { createClient } from "@/lib/client/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("ratings").select("*");

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, message: "Unexpected Error Occured" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const supabase = await createClient();

    const body = await req.json().catch(() => null);
    const stars = Number(body?.stars);
    const username =
      typeof body?.username === "string" ? body.username.trim() : "";

    if (!Number.isInteger(stars) || stars < 1 || stars > 5 || !username) {
      return NextResponse.json(
        { success: false, message: "Invalid Request" },
        { status: 400 },
      );
    }
    const { data, error } = await supabase
      .from("ratings")
      .insert({ stars, username });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, message: "Unexpected Error Occured" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
};

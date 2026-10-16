import createClient from "@/lib/supabase/server";
import z from "zod";
import { NextRequest } from "next/server";
import { done, fail } from "@/lib/api";

type Params = Promise<{ class_id: string }>;

export const GET = async (_req: NextRequest, params: Params) => {
  try {
    const { class_id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .eq("id", class_id);

    if (error) {
      console.error("[class GET] lookup failed:", error);
      return fail({ message: "Unexpected error occurred" }, 500);
    }
    if (!data) return fail({ message: "Not found" }, 404);

    return done(data, 200);
  } catch (err) {
    console.error("[class GET] unhandled:", err);
    return fail({ message: "Internal server error" }, 500);
  }
};

export const PATCH = async (req: NextRequest, params: Params) => {
  const querySchema = z
    .object({
      subject: z.string().min(1).max(50).optional(),
      description: z.string().min(1).max(300).optional(),
    })
    .refine(
      (query) => [query.subject, query.description].filter(Boolean).length < 1,
      {
        message: "Provide atleast one of: subject || description",
      },
    );

  try {
    const body = await req.json().catch(() => null);
    const { subject, description } = await body?.data;

    const updates = querySchema.parse({
      subject,
      description,
    });

    const { class_id } = await params;
    const supabase = await createClient();
    const { error } = await supabase
      .from("classes")
      .update(updates)
      .eq("id", class_id);

    if (error) return fail({ message: "Unexpected error occured" }, 500);

    return done(null, 200);
  } catch {
    return fail({ message: "Internal server error" }, 500);
  }
};

export const DELETE = async (_req: NextRequest, params: Params) => {
  try {
    const { class_id } = await params;

    const supabase = await createClient();

    const query = supabase.from("classes").delete().eq("id", class_id);

    const { error } = await query;
    if (error) {
      console.error("[class DELETE] failed", error);
      return fail({ message: error.message }, 401);
    }

    return done(null, 200);
  } catch {
    return fail({ message: "Unexpected error occured" }, 500);
  }
};

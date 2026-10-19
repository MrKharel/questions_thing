import createClient from "@/lib/supabase/server";
import z from "zod";
import { NextRequest } from "next/server";
import { done, fail } from "@/lib/api";

export const GET = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.from("classes").select("*");

    if (error) {
      console.error("[classes GET] lookup failed:", error);
      return fail({ message: "Unexpected error occurred" }, 500);
    }
    if (!data) return fail({ message: "Not found" }, 404);

    return done(data, 200);
  } catch (err) {
    console.error("[classes GET] unhandled:", err);
    return fail({ message: "Internal server error" }, 500);
  }
};

const postSchema = z
  .object({
    id: z.uuid(),
    subject: z.string().min(3).max(32),
    description: z.string().min(1).max(250).nullable().optional(),
    visibility: z.string().optional(),
    max_members: z.uint32().optional(),
    allow_late_submissions: z.boolean().optional(),
    members_can_see_eachother: z.boolean().optional(),
    students_can_comment: z.boolean().optional(),
  })
  .refine(
    (query) =>
      [
        query.id,
        query.subject,
        query.description,
        query.visibility,
        query.max_members,
        query.allow_late_submissions,
        query.members_can_see_eachother,
        query.students_can_comment,
      ].filter(Boolean).length >= 2,
    {
      message: "Must provide id and subject to POST a class",
    },
  );

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json().catch(() => null);

    const parsed = postSchema.safeParse({
      id: body.id ?? undefined,
      subject: body.subject ?? undefined,
      description: body.description ?? undefined,
      visibility: body.visibility ?? undefined,
      max_members: body.max_members ?? undefined,
      allow_late_submissions: body.allow_late_submissions ?? undefined,
      members_can_see_eachother: body.members_can_see_eachother ?? undefined,
      students_can_comment: body.students_can_comment ?? undefined,
    });

    if (!parsed.success) {
      return fail(
        { message: parsed.error.issues[0]?.message ?? "Invalid query" },
        400,
      );
    }

    const inserts = parsed.data;

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("classes")
      .insert(inserts)
      .select();

    if (error) {
      console.error("[POST class] failed: ", error);
      return fail({ message: "Unexpected error occured" }, 500);
    }

    return done(data, 200);
  } catch (err) {
    console.error("[POST class] unhandled:", err);
    return fail({ message: `Internal server error: ${err}` }, 500);
  }
};

import createClient from "@/lib/supabase/server";
import z from "zod";
import { NextRequest } from "next/server";
import { done, fail } from "@/lib/api";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ class_id: string }> },
) => {
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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ class_id: string }> },
) => {
  const querySchema = z
    .object({
      subject: z.string().min(3).max(32).optional(),
      description: z.string().min(0).max(250).optional(),
      visibility: z.string().optional(),
      max_members: z.number().optional(),
      allow_late_submissions: z.boolean().optional(),
      members_can_see_eachother: z.boolean().optional(),
      students_can_comment: z.boolean().optional(),
    })
    .refine(
      (query) =>
        [
          query.subject,
          query.description,
          query.visibility,
          query.max_members,
          query.allow_late_submissions,
          query.members_can_see_eachother,
          query.students_can_comment,
        ].filter(Boolean).length < 1,
      {
        message:
          "Provide atleast one of: subject, description, visibility, max_members, allow_late_submissions, members_can_see_eachother, students_can_comment",
      },
    );

  try {
    const body = await req
      .json()
      .then((body) => body.data)
      .catch(() => null);
    const updates = querySchema.safeParse({
      subject: body.subject,
      description: body.description,
      visibility: body.visibility,
      max_members: body.max_members,
      allow_late_submissions: body.allow_late_submissions,
      members_can_see_eachother: body.members_can_see_eachother,
      students_can_comment: body.students_can_comment,
    });
    const { class_id } = await params;

    const supabase = await createClient();
    const { error } = await supabase
      .from("classes")
      .update(updates)
      .eq("id", class_id);

    if (error) return fail({ message: "Unexpected error occured" }, 500);

    return done(updates, 200);
  } catch {
    return fail({ message: "Internal server error" }, 500);
  }
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ class_id: string }> },
) => {
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

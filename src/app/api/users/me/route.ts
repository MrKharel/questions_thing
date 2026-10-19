import createClient from "@/lib/supabase/server";
import z from "zod";
import { NextRequest } from "next/server";
import { done, fail } from "@/lib/api";

export const GET = async () => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (!user || userError) return fail({ message: "Unauthorized" }, 401);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("[profile GET] lookup failed:", error);
      return fail({ message: "Unexpected error occurred" }, 500);
    }
    if (!data) return fail({ message: "Not found" }, 404);

    return done(data, 200);
  } catch (err) {
    console.error("[profile GET] unhandled:", err);
    return fail({ message: "Internal server error" }, 500);
  }
};

export const PATCH = async (req: NextRequest) => {
  const querySchema = z
    .object({
      username: z.string().trim().min(1).max(32).optional(),
      display_name: z.string().min(1).max(32).optional(),
      bio: z.string().min(1).max(300).optional(),
      location: z.string().min(1).max(50).optional(),
      avatar: z.string().url().nullable().optional(),
    })
    .refine(
      (query) =>
        [
          query.username,
          query.display_name,
          query.bio,
          query.location,
          query.avatar,
        ].filter(Boolean).length >= 1,
      {
        message:
          "Provide atleast one of: username, display_name, bio, location or avatar",
      },
    );

  try {
    const body = await req.json().catch(() => null);
    const parsed = querySchema.safeParse({
      username: body.username ?? undefined,
      display_name: body.display_name ?? undefined,
      bio: body.bio ?? undefined,
      location: body.location ?? undefined,
      avatar: body.avatar ?? undefined,
    });

    if (!parsed.success) {
      return fail(
        { message: parsed.error.issues[0]?.message ?? "Invalid query" },
        400,
      );
    }
    const updates = parsed.data;

    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (!user || userError) return fail({ message: "Unauthorized" }, 401);

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("[profile PATCH] failed:", error);
      return fail({ message: "Unexpected error occured" }, 500);
    }

    return done(data, 200);
  } catch (err) {
    console.error("[profile PATCH] unhandled:", err);
    return fail({ message: "Internal server error" }, 500);
  }
};

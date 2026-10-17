import { NextRequest } from "next/server";
import createClient from "@/lib/supabase/server";
import z from "zod";
import { done, fail } from "@/lib/api";

export const GET = async (req: NextRequest) => {
  const querySchema = z
    .object({
      id: z.string().uuid().optional(),
      username: z.string().trim().min(1).max(50).optional(),
      display_name: z.string().min(1).max(100).optional(),
    })
    .refine(
      (q) => [q.id, q.username, q.display_name].filter(Boolean).length === 1,
      { message: "Provide exactly one of: id, username, display_name" },
    );

  try {
    const searchParams = req.nextUrl.searchParams;
    const parsedRequest = querySchema.safeParse({
      id: searchParams.get("id") ?? undefined,
      username: searchParams.get("username") ?? undefined,
      display_name: searchParams.get("display_name") ?? undefined,
    });

    if (!parsedRequest.success) {
      return fail(
        { message: parsedRequest.error.issues[0]?.message ?? "Invalid query" },
        400,
      );
    }
    const { id, username, display_name } = parsedRequest.data;

    const supabase = await createClient();

    // Multi-row lookup
    if (display_name) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("display_name", display_name)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) {
        console.error("[profiles GET] display_name lookup failed:", error);
        return fail({ message: "Unexpected error occurred" }, 500);
      }
      done(data, 200);
    }

    // Single-row lookup (exactly one of id/username is set by the schema)
    const column = id ? "id" : "username";
    const value = (id ?? username)!;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq(column, value)
      .maybeSingle();

    if (error) {
      console.error("[profiles GET] lookup failed:", error);
      return fail({ message: "Unexpected error occurred" }, 500);
    }
    if (!data) return fail({ message: "Not found" }, 404);

    return done(data, 200);
  } catch (err) {
    console.error("[profiles GET] unhandled:", err);
    return fail({ message: "Internal server error" }, 500);
  }
};

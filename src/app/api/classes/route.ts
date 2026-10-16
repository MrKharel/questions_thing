import createClient from "@/lib/supabase/server";
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

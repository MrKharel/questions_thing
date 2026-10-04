"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/client/server";
import { validate } from "@/lib/validate";

type Props = { username: string };

type Result =
	| { data: { username: string }; error: null }
	| { data: null; error: { message: string } };

export async function updateUsername({ username }: Props): Promise<Result> {
	const checks = validate({ username: username });
	if (!checks.valid) {
		return { data: null, error: { message: checks.message } };
	}

	try {
		const supabase = await createClient();
		const { error } = await supabase
			.from("profiles")
			.update({ username: username });
		if (error) {
			if (error.code === "23505") {
				return { data: null, error: { message: "Username already taken." } };
			}
			return { data: null, error: { message: "Could not update username." } };
		}

		revalidatePath("/", "layout");
		return { data: { username: username }, error: null };
	} catch {
		return {
			data: null,
			error: { message: "Something went wrong. Try again." },
		};
	}
}

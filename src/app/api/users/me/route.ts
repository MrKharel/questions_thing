import { createClient } from "@/lib/client/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();
		if (authError || !user) {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.single();

		if (error) {
			console.error(error);
			return NextResponse.json(
				{ success: false, message: error.message },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (err) {
		return NextResponse.json(
			{ success: false, message: "Internal Server Error" },
			{ status: 500 },
		);
	}
};

export const PATCH = async (req: NextRequest) => {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();
		if (authError || !user) {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await req.json().catch(() => null);
		const username = body?.data?.username?.trim();
		const avatar = body?.data?.avatar;

		if (!username && !avatar) {
			return NextResponse.json(
				{ success: false, message: "Invalid input" },
				{ status: 400 },
			);
		}

		const updates: { username?: string; avatar?: string } = {};
		if (username) updates.username = username;
		if (avatar) updates.avatar = avatar;

		const { data, error } = await supabase
			.from("profiles")
			.update(updates)
			.eq("id", user.id)
			.select()
			.single();

		if (error) {
			console.error(error);

			const isDuplicate = error.code === "23505";
			const isBadUsername =
				error.code === "23514" && error.message.includes("username_letters");

			return NextResponse.json(
				{
					success: false,
					message: isDuplicate
						? "Username already taken"
						: isBadUsername
							? "Username can only contain lowercase letters"
							: "Update failed",
				},
				{ status: isDuplicate ? 409 : isBadUsername ? 400 : 500 },
			);
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			{ success: false, message: "Internal error" },
			{ status: 500 },
		);
	}
};

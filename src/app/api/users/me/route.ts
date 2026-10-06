import { createClient } from "@/lib/client/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
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

		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("id", user.id)
			.single();
		if (error) {
			return NextResponse.json(
				{ success: false, message: error.message },
				{ status: 500 },
			);
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ success: false, error: "Internal Server Error" },
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
		if (!user || authError) {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await req.json().catch(() => null);
		const username = body?.data?.username.trim();
		const avatar = body?.data?.avatar;

		const updates: { username?: string; avatar?: string } = {};
		if (username) updates.username = username;
		if (avatar) updates.avatar = avatar;

		if (!username && !avatar) {
			return NextResponse.json(
				{ success: false, message: "Invalid Input" },
				{ status: 400 },
			);
		}

		const { data, error } = await supabase
			.from("profiles")
			.update(updates)
			.eq("id", user.id)
			.select("*")
			.single();

		if (error) {
			console.error(
				"profile update failed:",
				error.code,
				error.message,
				error.details,
			);

			switch (error.code) {
				case "23505":
					return NextResponse.json(
						{ success: false, message: "Username already taken" },
						{ status: 409 },
					);
				case "PGRST116": // no row updated: missing profile or RLS blocked it
					return NextResponse.json(
						{ success: false, message: "Profile not found" },
						{ status: 404 },
					);
				case "23514":
				case "22001":
				case "22P02":
					return NextResponse.json(
						{ success: false, message: "Invalid value" },
						{ status: 400 },
					);
				default:
					return NextResponse.json(
						{ success: false, message: "Update failed" },
						{ status: 500 },
					);
			}
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch {
		return NextResponse.json(
			{ success: false, message: "Internal server error" },
			{ status: 500 },
		);
	}
};

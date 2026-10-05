import { NextResponse } from "next/server";
import { createClient } from "@/lib/client/server";

export const GET = async ({
	params,
}: {
	params: Promise<{ username: string }>;
}) => {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: authError,
		} = await supabase.auth.getUser();
		if (!user || authError) {
			return NextResponse.json(
				{ success: false, message: "Unauthorized" },
				{ status: 400 },
			);
		}

		const { username } = await params;

		const { data, error } = await supabase
			.from("profiles")
			.select("*")
			.eq("username", username)
			.maybeSingle();
		if (error) {
			return NextResponse.json(
				{ success: false, message: "Unexpected Error occured" },
				{ status: 500 },
			);
		}
		if (!data) {
			return NextResponse.json(
				{ success: false, message: "Not Found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ success: true, data }, { status: 200 });
	} catch (err: any) {
		return NextResponse.json(
			{ success: false, message: "Internal Server Error" },
			{ status: 500 },
		);
	}
};

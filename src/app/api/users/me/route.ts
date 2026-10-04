"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/client/server";

export const GET = async () => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("profiles").select("*").single();
	if (error) return NextResponse.json({ error });
	return { data };
};

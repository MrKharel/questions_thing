import { NextResponse } from "next/server";

const fail = (error: { message: string }, status: number) =>
  NextResponse.json({ success: false, error }, { status });

export { fail };

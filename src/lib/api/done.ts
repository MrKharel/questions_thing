import { NextResponse } from "next/server";

const done = (data: null | Object, status: number) =>
  NextResponse.json({ success: true, data }, { status });

export { done };

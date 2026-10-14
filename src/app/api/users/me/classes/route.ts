import { NextResponse } from "next/server";

import type { Class, ApiResponse } from "../../../types";

const virtualClass: Class[] = [
  {
    id: "1",
    subject: "CS52",
    description: null,
    created_by: "1",
    created_at: `2099-12-11T06:04:17Z`,
    updated_at: `2099-12-11T06:04:17Z`,
  },
  {
    id: "2",
    subject: "ABC123",
    description: null,
    created_by: "1",
    created_at: `2099-12-11T06:04:17Z`,
    updated_at: `2099-12-11T06:04:17Z`,
  },
];

const GET = async (): Promise<NextResponse<ApiResponse<Class[]>>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json({ success: true, data: virtualClass }));
    }, 3000);
  });
};

export { GET };

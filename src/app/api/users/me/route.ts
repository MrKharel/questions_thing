import { NextResponse } from "next/server";

import type { Profile, ApiResponse } from "../../types";

const UserProfile: Profile = {
  id: "1",
  username: "ajeshkharel1",
  display_name: "Ajesh Kharel",
  email: "ajeshkharel5@gmail.com",
  avatar: null,
  bio: "Just Living my Life... Nothing Special",
  location: "Jhapa, Nepal",
  created_at: `2099-12-11T06:04:17Z`,
  updated_at: `2099-12-11T06:04:17Z`,
};

const GET = async (): Promise<NextResponse<ApiResponse<Profile>>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json({ success: true, data: UserProfile }));
    }, 3000);
  });
};

const PATCH = async () => {};

export { GET, PATCH };
